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

function EditExpenseDialog({
  show,
  close,
  account,
  setTransactions,
  transactions,
  currentId,
}) {
  let expense = transactions.filter(
    (transaction) => transaction._id === currentId
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: expense[0] || {
      amount: 0,
      category: "",
      date: Date.now(),
      merchant_name: "",
      name: "",
      pending: false,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const id = values._id;

        const response = await axios.put(
          `/api/expense/${id}`,
          JSON.stringify(values),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        let edittedExpense = response.data.expense;

        setTransactions(
          transactions.map((transaction) =>
            transaction._id === id
              ? {
                  ...transaction,
                  amount: edittedExpense.amount,
                  category: edittedExpense.category,
                  date: edittedExpense.date,
                  merchant_name: edittedExpense.merchant_name,
                  name: edittedExpense.name,
                }
              : transaction
          )
        );

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
      <DialogTitle>Editting Expense</DialogTitle>
      <DialogContent>
        <DialogContentText>Edit a current expense</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Expense Name"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <TextField
          margin="dense"
          id="merchant_name"
          label="Merchant Name"
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.merchant_name}
        />
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="number"
          variant="standard"
          // defaultValue={expense.amount}
          onChange={formik.handleChange}
          value={formik.values.amount}
        />
        <TextField
          sx={{ m: 1 }}
          label="Category"
          id="category"
          name="category"
          select
          onChange={formik.handleChange}
          value={formik.values.category}
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
        <Button onClick={formik.handleSubmit}>Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditExpenseDialog;
