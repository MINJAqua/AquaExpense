import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from "../components/TransactionTable";
import Widget from "../components/Widget";
import ProgressBar from "../components/ProgressBar";
import LineGraph from "../components/LineChart";
import Plaid from "../components/Plaid";
import "../css/Dashboard.css";

const Dashboard = () => {
  //array of all transactions from transactionResponse api call
  //default value is false because we are conditionally rendering TransactionTable child component
  const [transactions, setTransactions] = useState(false);

  //array of all the accounts that were selected when completing plaid link
  const [accounts, setAccounts] = useState([]);

  //account selected inside the select dropdown list
  //default value is false because we are conditionally rendering Widget child component
  const [account, setAccount] = useState(false);

  const handleChange = (e) => {
    const handleChangeAccount = JSON.parse(e.target.value);
    setAccount(handleChangeAccount);
  };

  useEffect(() => {
    const getTransactions = async () => {
      const email = localStorage.email;
      try {
        const transactionsResponse = await axios.get(
          "/api/plaid/transactions",
          { params: { email: email } }
        );
        const userTransactions = transactionsResponse.data;
        setTransactions(userTransactions.transactions);
        setAccounts(userTransactions.accounts);
        setAccount(userTransactions.accounts[0]);
      } catch (error) {
        console.log(error, "FAILED TO GET ACCESS TOKEN OR TRANSACTIONS");
      }
    };
    getTransactions();
  }, []);

  return !account ? (
    <div className="plaid-container">
      <Plaid />
      <br />
      <h2>or</h2>
      <br />
    </div>
  ) : (
    <div className="dashboard">
      <div className="select-accounts-container">
        <select className="select-accounts" onChange={handleChange}>
          {accounts.map((account, index) => {
            return (
              <option value={JSON.stringify(account)} key={index}>
                {account.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="widgets">
        {account ? <Widget type="account" account={account} /> : null}
        {account && transactions ? (
          <Widget
            type="transactions"
            transactions={transactions}
            account={account}
          />
        ) : null}
        {account ? (
          <Widget
            type="balance"
            account={account}
            transactions={transactions}
          />
        ) : null}
      </div>
      {transactions && account ? (
        <div className="charts">
          <ProgressBar />
          <LineGraph transactions={transactions} account={account} />
        </div>
      ) : null}
      {transactions && account ? (
        <TransactionTable transactions={transactions} account={account} />
      ) : (
        "need to update"
      )}
    </div>
  );
};

export default Dashboard;
