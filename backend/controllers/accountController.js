const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");
const User = require("../models/userModel");

//@Get Account
// GET api/account

const getAccounts = asyncHandler(async (req, res) => {
  let { email } = req.query;

  const user = await User.findOne({ email: email });
  user_id = user._id.toString();

  const accounts = await Account.find({ user_id: user_id });

  res.status(200).json(accounts);
});

//@Create Account
// POST api/account

const createAccount = asyncHandler(async (req, res) => {
  let {
    email,
    user_id,
    account_id,
    balances,
    mask,
    name,
    official_name,
    type,
  } = req.body;

  if (email) {
    const user = await User.findOne({ email: email });
    user_id = user._id.toString();
  }

  //Checks if any of the required fields are missing
  //If any are missing then give an error
  if (!user_id || !balances || !name || !type) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const account = await Account.create({
    user_id,
    account_id,
    balances,
    mask,
    name,
    official_name,
    type,
  });

  const newId = account._id.toString();

  if (account) {
    res.status(201).json({
      _id: newId,
      user_id: account.user_id,
      account_id: account.account_id,
      balances: account.balances,
      mask: account.mask,
      name: account.name,
      official_name: account.official_name,
      type: account.type,
    });

    console.log("account created");
  } else {
    res.status(400);
    throw new Error("Invalid Account");
  }
});

//@Create Plaid Account
// POST api/account/plaidAccount

const createPlaidAccounts = asyncHandler(async (req, res) => {
  const plaidAccounts = req.body.accounts;
  const email = req.body.email;

  const user = await User.findOne({ email: email });
  const userId = user._id.toString();

  let accounts = plaidAccounts.map((obj) => ({ ...obj, user_id: userId }));

  console.log(accounts);

  const newPlaidAccounts = Account.insertMany(accounts, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.status(201).json({ plaidAccounts });
    }
  });
});

//@Update Account
//PUT api/account /:id

const updateAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated Account ${req.params.id}` });
});

//@Delete Account
//DELETE api/account/:id

const deleteAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted Account ${req.params.id}` });
});

module.exports = {
  getAccounts,
  createAccount,
  createPlaidAccounts,
  updateAccount,
  deleteAccount,
};
