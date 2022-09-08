const asyncHandler = require("express-async-handler");

//@Get Expense
// GET api/expense

const getExpenses = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get expense" });
});

//@Set Expense
// SET api/expense

const setExpense = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Set expense" });
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
