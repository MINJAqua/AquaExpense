import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from '../components/TransactionTable';

const Dashboard = () => {
  //array of all transactions from transactionResponse api call
  //default value is false because we are conditionally rendering TransactionTable child component
  const [transactions, setTransactions] = useState(false);

  //array of all the accounts that were selected when completing plaid link
  const [accounts, setAccounts] = useState([]);

  //the accountId associated with the account name
  const [accountId, setAccountId] = useState('')

  //set state equal to a new account being selected in the dropdown list
  const handleChange = (e) => {
    setAccountId(e.target.value)
  }

  useEffect(() => {
    const getTransactions = async () => {
      const email = localStorage.email
      try {
        const transactionsResponse = await axios.get("/api/plaid/transactions", {params: {email: email} });
        const userTransactions = transactionsResponse.data;
        setTransactions(userTransactions.transactions);
        setAccounts(userTransactions.accounts);

        //Set the defualt value of accountId equal to the first account inside of userTransactions.accounts
        setAccountId(userTransactions.accounts[0].account_id)
      } catch (error) {
        console.log(error, "FAILED TO GET ACCESS TOKEN OR TRANSACTIONS");
      }
    }
    getTransactions();
  }, []);


  return (
    <div className='dashboard'>
      <div className='select-accounts-container'>
        <select className="select-accounts" onChange={handleChange}>
          {accounts.map(account => {
            return (
              <option value={account.account_id}>{account.name}</option>
            )
          })}
        </select>
      </div>
      {/* we must conditionally render our TransactionTable child component to wait for state to update, or else
      the props we send down will be undefined  */}
      {transactions ? <TransactionTable transactions={transactions} accountId={accountId}/> : 'need to update'}
    </div>
  )
}

export default Dashboard
