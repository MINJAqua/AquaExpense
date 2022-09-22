const express = require("express");
const router = express.Router();

const {
  createToken,
  exchangeToken,
  getTransactions,
} = require("../controllers/plaidController");

router.post("/", createToken);
router.post("/exchange", exchangeToken);
router.get("/transactions", getTransactions);

module.exports = router;
