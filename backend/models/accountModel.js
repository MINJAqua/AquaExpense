const mongoose = require("mongoose");

const accountModel = mongoose.Schema({
  account_id: {
    type: String,
    required: true,
  },
  balances: {
    available: Number,
    current: Number,
    limit: Number,
    iso_currency_code: String,
    last_updated_time: String,
  },
  mask: String,
  name: {
    type: String,
    required: true,
  },
  official_name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

mondule.exports = mongoose.model("Account", accountModel);
