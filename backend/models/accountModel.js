const mongoose = require("mongoose");

const accountModel = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_id: {
    type: String,
    required: true,
  },
  balances: {
    type: Number,
    required: true,
  },
  mask: String,
  name: {
    type: String,
    required: true,
  },
  official_name: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Account", accountModel);
