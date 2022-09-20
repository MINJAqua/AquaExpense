const express = require("express");
const router = express.Router();

const {
  createToken,
  getTransactions,
  getAccessToken,
} = require("../controllers/plaidController");

router.post("/", createToken);
router.post("/exchange", getAccessToken);

router.get("/transactions", getTransactions);

module.exports = router;
