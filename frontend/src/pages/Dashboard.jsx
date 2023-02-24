import React, { useState, useEffect } from "react";
import axios from "../axios";
import TransactionTable from "../components/TransactionTable";
import Widget from "../components/Widget";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import AccountDialog from "../components/AccountDialog";
import ExpenseDialog from "../components/ExpenseDialog";
import Plaid from "../components/Plaid";
import SmallPlaid from "../components/SmallPlaid";
import { FaPlusCircle } from "react-icons/fa";
import { Divider, Typography, Button } from "@mui/material";
import "../css/Dashboard.css";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
  const [loading, setLoading] = useState(false);
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
        let accountData = response.data;

        setAccounts(accountData);
        setAccount(accountData[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getAccounts();
  }, []);

  useEffect(() => {
    if (account) {
      const getExpenses = async () => {
        const currentAccount = account._id;

        try {
          setLoading(true);
          const response = await axios.get("/api/expense", {
            params: { currentAccount },
          });
          let expenses = response.data.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
          });

          setTransactions([...expenses]);
        } catch (error) {
          console.log(error);
        }
      };
      setLoading(false);
      getExpenses();
    }
  }, [account]);

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
          accounts={accounts}
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
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </Button>
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
        <TransactionTable
          transactions={transactions}
          account={account}
          setTransactions={setTransactions}
        />
      ) : (
        <div className="expense-container">
          <button
            className="expense-button"
            onClick={() => setOpenExpenseDialog(true)}
          >
            Click here
          </button>
          <ExpenseDialog
            show={openExpenseDialog}
            close={() => setOpenExpenseDialog(false)}
            account={account}
            setTransactions={setTransactions}
            transactions={transactions}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
