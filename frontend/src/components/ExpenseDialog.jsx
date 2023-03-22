import {
  Button,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "../axios";
import { useState } from "react";

function ExpenseDialog({
  show,
  close,
  account,
  setTransactions,
  transactions,
}) {
  const formik = useFormik({
    initialValues: {
      amount: "",
      category: "",
      date: Date.now(),
      name: "",
      merchant_name: "",
      pending: false,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const accountId = account._id;

        const response = await axios.post(
          "/api/expense",
          JSON.stringify(values),
          {
            params: { account_id: accountId },
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        let newExpense = response.data;

        setTransactions([...transactions, newExpense]);

        resetForm();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Dialog
      fullWidth
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      open={show}
      onClose={close}
    >
      <DialogTitle>Add an Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Create an expense and then we will store it.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Expense Name"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
        />
        <TextField
          margin="dense"
          id="merchant_name"
          label="Merchant Name"
          variant="standard"
          onChange={formik.handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          variant="standard"
          onChange={formik.handleChange}
        />
        <TextField
          sx={{ m: 1 }}
          label="Category"
          id="category"
          name="category"
          select
          defaultValue={""}
          onChange={formik.handleChange}
        >
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Food">Food</MenuItem>
          <MenuItem value="Loan">Loan</MenuItem>
          <MenuItem value="Transportation">Transportation</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={formik.values.date}
          onChange={(value) => formik.setFieldValue("date", value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={formik.handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseDialog;
