import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from "../components/TransactionTable";
import Widget from "../components/Widget";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import AccountDialog from "../components/AccountDialog";
import Plaid from "../components/Plaid";
import SmallPlaid from "../components/SmallPlaid";
import { FaPlusCircle } from "react-icons/fa";
import { Divider, Typography } from "@mui/material";
import "../css/Dashboard.css";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  //array of all transactions from transactionResponse api call
  //default value is false because we are conditionally rendering TransactionTable child component
  const [transactions, setTransactions] = useState([]);

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
    const getAccounts = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await axios.get("/api/account", {
          params: { email },
        });
        console.log(response);
        let accountData = response.data;

        setAccounts(accountData);
        setAccount(accountData[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();
  }, []);

  return !account ? (
    <div className="plaid-container">
      <Plaid
        setAccounts={setAccounts}
        setAccount={setAccount}
        setTransactions={setTransactions}
      />
      <br />
      <Divider sx={{ padding: 3 }}>
        <Typography sx={{ fontSize: "1.25rem" }} color="textSecondary">
          or
        </Typography>
      </Divider>
      <br />
      <div className="button-container">
        <button className="add-expense" onClick={() => setOpenDialog(true)}>
          Create your expenese {""}
          <FaPlusCircle />
        </button>
        <AccountDialog
          show={openDialog}
          close={() => setOpenDialog(false)}
          setAccounts={setAccounts}
          setAccount={setAccount}
        />
      </div>
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
        <button onClick={() => setOpenDialog(true)}>Click here</button>
        <AccountDialog
          show={openDialog}
          close={() => setOpenDialog(false)}
          setAccounts={setAccounts}
          setAccount={setAccount}
          accounts={accounts}
        />
        <SmallPlaid
          setAccounts={setAccounts}
          setAccount={setAccount}
          setTransactions={setTransactions}
        />
      </div>

      <div className="widgets">
        {account ? <Widget type="account" account={account} /> : null}
        {account ? (
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
      {transactions.length !== 0 && account ? (
        <div className="charts">
          {/* <ProgressBar /> */}

          <PieChart transactions={transactions} account={account} />
          <BarChart transactions={transactions} account={account} />
          {/* <LineGraph transactions={transactions} account={account} /> */}
        </div>
      ) : null}
      {transactions.length !== 0 && account ? (
        <TransactionTable transactions={transactions} account={account} />
      ) : (
        <div className="expense-container">
          <button className="expense-button">Click here</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
