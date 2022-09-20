const express = require("express");
const router = express.Router();

const {
  createToken,
  getTransactions,
  getAccessToken,
} = require("../controllers/plaidController");

router.post("/", createToken);
router.post("/transactions/get", getTransactions);
router.post("/items/public_token/exchange", getAccessToken);

module.exports = router;
