import React, { useState, useEffect } from "react";
import axios from "../axios";
import { useFormik } from "formik";
import TransactionTable from "../components/TransactionTable";
import Widget from "../components/Widget";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";
import Plaid from "../components/Plaid";
import SmallPlaid from "../components/SmallPlaid";
import { FaPlusCircle } from "react-icons/fa";
import {
  Divider,
  Typography,
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import "../css/Dashboard.css";

const Dashboard = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      balances: "",
      type: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      try {
        const email = localStorage.getItem("email");
        values.email = email;
        const response = await axios.post(
          "/api/account",
          JSON.stringify(values),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        resetForm();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    const getAccounts = async () => {};
  });

  const [open, setOpen] = useState(false);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <button className="add-expense" onClick={handleClickOpen}>
          Create your expenese {""}
          <FaPlusCircle />
        </button>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
        >
          <DialogTitle>Create an account</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create an account to store your expenses
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of Account"
              fullWidth
              variant="standard"
              onChange={formik.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="balances"
              label="Balance"
              type="number"
              variant="standard"
              onChange={formik.handleChange}
            />
            <TextField
              sx={{ m: 1, width: "25ch" }}
              label="Type"
              id="type"
              name="type"
              select
              defaultValue={""}
              onChange={formik.handleChange}
            >
              <MenuItem value="Credit">Credit</MenuItem>
              <MenuItem value="Depository">Depository</MenuItem>
              <MenuItem value="Loan">Loan</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={formik.handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
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
        <SmallPlaid
          setAccounts={setAccounts}
          setAccount={setAccount}
          setTransactions={setTransactions}
        />
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
          {/* <ProgressBar /> */}

          <PieChart transactions={transactions} account={account} />
          <BarChart transactions={transactions} account={account} />
          {/* <LineGraph transactions={transactions} account={account} /> */}
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
