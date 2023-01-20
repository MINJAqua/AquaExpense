import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "../axios";
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

function AccountDialog({ show, close, setAccount, setAccounts, accounts }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      balances: "",
      type: "",
    },
    onSubmit: async (values, { resetForm }) => {
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

        setAccounts([...accounts, response.data]);
        setAccount(response.data);
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
        <Button onClick={close}>Cancel</Button>
        <Button onClick={formik.handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AccountDialog;
