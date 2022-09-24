import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from '../components/TransactionTable';
import Widget from '../components/Widget';

const Dashboard = () => {

  //Hello Jun, sorry if my code is confusing but here is just a overview of how this dashbaord component works

  // getTransactions grabs all the data from our transactions/get api call. We then set transactions state equal
  // to only the transactions array from userTransactions. The state, accounts, is then set to the array of
  // accounts that come from userTransactions. Finally, accountId is set to the first account_id inside inside of
  // userTransactions as a defualt value.

  // Now we just create child components and pass down our state values as props. If your compoent needs a new
  // state, feel free to create new ones. Just a heads up that sometimes you might need to conditionally render
  // your child componets because it takes time for state values to update.

  // Good luck out there, and feel free to hit me up if you need help understanding my code!

  //array of all transactions from transactionResponse api call
  //default value is false because we are conditionally rendering TransactionTable child component
  const [transactions, setTransactions] = useState(false);

  //array of all the accounts that were selected when completing plaid link
  const [accounts, setAccounts] = useState([]);

  //the accountId associated with the account name
  const [accountId, setAccountId] = useState('');

  const [widgetName, setWidgetName ] = useState('');

  //set state equal to a new account being selected in the dropdown list
  const handleChange = (e) => {
    const handleChangeId = e.target.value.split(',')[0];
    const handleChnageName = e.target.value.split(',')[1]
    //console.log(e.target.value.split(',')[0])
    setAccountId(handleChangeId);
    setWidgetName(handleChnageName);

  }

  useEffect(() => {
    const getTransactions = async () => {
      const email = localStorage.email
      try {
        const transactionsResponse = await axios.get("/api/plaid/transactions", {params: {email: email} });
        const userTransactions = transactionsResponse.data;
        console.log(userTransactions)
        setTransactions(userTransactions.transactions);
        setAccounts(userTransactions.accounts);

        //Set the defualt value of accountId equal to the first account inside of userTransactions.accounts
        setAccountId(userTransactions.accounts[0].account_id)
        setWidgetName(userTransactions.accounts[0].name)
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
          {accounts.map((account, index) => {
            return (
              <option value={[account.account_id, account.name]} key={index}>{account.name}</option>
            )
          })}
        </select>
      </div>
      <div className='widgets'>
        {accountId && widgetName ? <Widget type='account' accountId={accountId} widgetName={widgetName}/> : null}
        {/* <Widget type='account' accountId={accountId} accounts={accounts}/> */}
        {/* <Widget type='transactions' transactions={transactions} accountId={accountId}/>
        <Widget type='balance' transactions={transactions} accountId={accountId}/> */}
      </div>
      {/* we must conditionally render our TransactionTable child component to wait for state to update, or else
      the props we send down will be undefined  */}
      {transactions ? <TransactionTable transactions={transactions} accountId={accountId}/> : 'need to update'}
    </div>
  )
}

export default Dashboard
