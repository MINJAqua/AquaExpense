const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

//@Get Expense
// GET api/expense

const getExpenses = asyncHandler(async (req, res) => {
  let { currentAccount } = req.query;

  const expenses = await Expense.find({ account_id: currentAccount });

  res.status(200).json(expenses);
});

//@Set Expense
// SET api/expense

const setExpense = asyncHandler(async (req, res) => {
  const {
    account_id = req.query.account_id,
    amount,
    iso_currency_code,
    category,
    date,
    name,
    merchant_name,
    pending,
  } = req.body;

  //Checks if any of the required fields are missing
  //If any are missing then give an error
  if (!amount || !category || !date || !name) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const expense = await Expense.create({
    account_id,
    amount,
    iso_currency_code,
    category,
    date,
    name,
    merchant_name,
    pending,
  });

  if (expense) {
    res.status(201).json({
      account_id: expense.account_id,
      amount: expense.amount,
      iso_currency_code: expense.iso_currency_code,
      category: expense.category,
      date: expense.date,
      name: expense.name,
      merchant_name: expense.merchant_name,
      pending: expense.pending,
    });
    console.log("expense created");
  } else {
    res.status(400);
    throw new Error("Invalid Expense");
  }
});

//@Update Expense
//PUT api/expense/:id

const updateExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { amount, category, name, date } = req.body;

  Expense.findByIdAndUpdate(
    id,
    { name: name, amount: amount, category: category, date: date },
    { new: true },
    (err, expense) => {
      if (!expense) return res.status(404).json({ error: "Expense not found" });
      else {
        res.status(200).json({ message: "Successfully updated", expense });
      }
    }
  );
});

//@Delete Expense
//DELETE api/expense/:id

const deleteExpense = asyncHandler(async (req, res) => {
  const id = req.params.id;

  Expense.findByIdAndDelete(id, (err, expense) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    res.json({ message: `Successfully deleted Expense ${id}` });
  });
});

module.exports = { getExpenses, setExpense, updateExpense, deleteExpense };
