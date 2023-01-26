const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema({
  account_id: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  iso_currency_code: String,
  category: {
    type: String,
    required: true,
  },
  category_id: String,
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  merchant_name: String,
  pending: Boolean,
});

module.exports = mongoose.model("Expense", expenseSchema);
