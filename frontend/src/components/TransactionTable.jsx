import "../css/TransactionTable.css";
import axios from "../axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { MdAdd } from "react-icons/md";
import { FaTrash, FaEdit, FaCheck, FaClock } from "react-icons/fa";
import ExpenseDialog from "./ExpenseDialog";
import moment from "moment";

const TransactionTable = ({ transactions, account, setTransactions }) => {
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  //Set the transactions equal to row because accountTransactions is a very long variable lol
  const rows = transactions;
  console.log(rows);

  const tableRowStyle = { fontWeight: "bold" };

  // //dependency set to accountId to update new transactions if user selects a new account
  // useEffect(() => {
  //   const populateRows = () => {
  //     const allTransactions = transactions;
  //     const transactionsById = [];
  //     //populate the transactionsById array with only transactions that match the account selected
  //     allTransactions.forEach((transaction) => {
  //       const obj = {};

  //       if (transaction.account_id === accountId) {
  //         obj.id = transaction._id;
  //         obj.date = moment(transaction.date).format("ll");
  //         obj.company = transaction.merchant_name
  //           ? transaction.merchant_name
  //           : transaction.name;
  //         obj.category = transaction.category;
  //         obj.amount = transaction.amount;
  //         obj.status = transaction.pending ? "Pending" : "Verified";
  //         transactionsById.push(obj);
  //       }
  //     });

  //     setAccountTransactions(
  //       transactionsById.sort(function (a, b) {
  //         return new Date(a.date) - new Date(b.date);
  //       })
  //     );
  //   };
  //   populateRows();
  // }, [accountId, transactions]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expense/${id}`);

      setTransactions((prevTransactions) =>
        prevTransactions.filter((data) => data._id !== id)
      );
    } catch (error) {
      throw error;
    }
  };

  const handleUpdate = async () => {
    try {
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="table-container">
      <div className="table-title">
        Transactions
        <IconButton
          size="small"
          sx={{
            justifyContent: "flex-end",
            float: "right",
            marginBottom: "15px",
          }}
          onClick={() => setOpenExpenseDialog(true)}
        >
          <MdAdd color="#09b3ec" />
        </IconButton>
        <ExpenseDialog
          show={openExpenseDialog}
          close={() => setOpenExpenseDialog(false)}
          account={account}
          setTransactions={setTransactions}
          transactions={transactions}
        />
      </div>

      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableRowStyle} className="tableRow">
                DATE CREATED
              </TableCell>
              <TableCell sx={tableRowStyle} className="tableRow">
                NAME
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
              <TableCell sx={tableRowStyle} className="tableRow">
                ACTIONS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  {moment(row.date).format("ll")}
                </TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">$ {row.amount}</TableCell>
                <TableCell className="tableStatus">
                  {row.pending ? <FaClock /> : <FaCheck color="#90EE90" />}
                </TableCell>
                <TableCell className="actionCell">
                  <IconButton
                    size="small"
                    sx={{ marginRight: "5px" }}
                    onClick={() => handleUpdate(row._id)}
                  >
                    <FaEdit color="#09b3ec" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(row._id)}
                  >
                    <FaTrash color="#aab3b5" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
