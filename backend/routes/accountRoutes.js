const express = require("express");
const router = express.Router();
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  createPlaidAccounts,
} = require("../controllers/accountController");

router.route("/").get(getAccounts).post(createAccount);
router.route("/plaidAccount").post(createPlaidAccounts);
router.route("/:id").put(updateAccount).delete(deleteAccount);

module.exports = router;
