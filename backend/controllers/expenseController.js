const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

//@Get Expense
// GET api/expense

const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.find();

  res.status(200).json(expenses);
});

//@Set Expense
// SET api/expense

const setExpense = asyncHandler(async (req, res) => {
  const {
    account_id,
    amount,
    iso_currency_code,
    category,
    date,
    name,
    merchant_name,
  } = req.body;

  //Checks if any of the required fields are missing
  //If any are missing then give an error
  if (!account_id || !amount || !category || !date || !name) {
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
  res.status(200).json({ message: `Updated expense ${req.params.id}` });
});

//@Delete Expense
//DELETE api/expense/:id

const deleteExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted expense ${req.params.id}` });
});

module.exports = { getExpenses, setExpense, updateExpense, deleteExpense };
