import "../css/TransactionTable.css";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TransactionTable = ({ transactions, account }) => {
  const [accountTransactions, setAccountTransactions] = useState([]);
  const accountId = account.account_id;
  //Set the transactions equal to row because accountTransactions is a very long variable lol
  const rows = accountTransactions;
  const tableRowStyle = { fontWeight: "bold" };

  //dependency set to accountId to update new transactions if user selects a new account
  useEffect(() => {
    const populateRows = () => {
      const allTransactions = transactions;
      const transactionsById = [];
      //populate the transactionsById array with only transactions that match the account selected
      allTransactions.forEach((transaction) => {
        const obj = {};
        if (transaction.account_id === accountId) {
          obj.id = transaction.transaction_id;
          obj.date = transaction.date;
          obj.company = transaction.merchant_name
            ? transaction.merchant_name
            : transaction.name;
          obj.category = transaction.category[0];
          obj.amount = transaction.amount;
          obj.status = transaction.pending ? "Pending" : "Verified";
          transactionsById.push(obj);
        }
      });
      setAccountTransactions(transactionsById);
    };
    populateRows();
  }, [accountId, transactions]);

  return (
    <div className="table-container">
      <div className="table-title">Transactions</div>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableRowStyle} className="tableRow">
                DATE
              </TableCell>
              <TableCell sx={tableRowStyle} className="tableRow">
                COMPANY
              </TableCell>
              <TableCell sx={tableRowStyle} className="tableRow">
                CATEGORY
              </TableCell>
              <TableCell sx={tableRowStyle} className="tableRow">
                AMOUNT
              </TableCell>
              <TableCell sx={tableRowStyle} className="tableRow">
                STATUS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.company}</TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">${row.amount}</TableCell>
                <TableCell className="tableCell">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
