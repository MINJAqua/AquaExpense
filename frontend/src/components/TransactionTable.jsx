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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FaTrash, FaEdit, FaCheck, FaClock } from "react-icons/fa";
import ExpenseDialog from "./ExpenseDialog";
import EditExpenseDialog from "./EditExpenseDialog";
import moment from "moment";

const TransactionTable = ({ transactions, account, setTransactions }) => {
  const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

  const [openEditExpenseDialog, setOpenEditExpenseDialog] = useState(false);
  const [currentId, setCurrentId] = useState("");

  //Set the transactions equal to row because accountTransactions is a very long variable lol
  const rows = transactions;

  const tableRowStyle = { fontWeight: "bold" };

  const handleClick = (id) => {
    setCurrentId(id);
    setOpenEditExpenseDialog(true);
  };

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
          <AddCircleIcon sx={{ color: "#09b3ec", fontSize: 30 }} />
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
                    onClick={() => {
                      handleClick(row._id);
                    }}
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
            <EditExpenseDialog
              show={openEditExpenseDialog}
              close={() => setOpenEditExpenseDialog(false)}
              account={account}
              setTransactions={setTransactions}
              transactions={transactions}
              currentId={currentId}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TransactionTable;
