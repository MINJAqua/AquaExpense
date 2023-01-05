const asyncHandler = require("express-async-handler");
const Account = require("../models/accountModel");

//@Get Account
// GET api/account

const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find();

  res.status(200).json(accounts);
});

//@Create Account
// POST api/account

const createAccount = asyncHandler(async (req, res) => {
  const { user_id, account_id, balances, mask, name, official_name, type } =
    req.body;

  //Checks if any of the required fields are missing
  //If any are missing then give an error
  if (!account_id || !balances || !mask || !name || !type) {
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

  if (account) {
    res.status(201).json({
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

module.exports = { getAccounts, createAccount, updateAccount, deleteAccount };
