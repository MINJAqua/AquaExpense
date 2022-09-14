const express = require("express");
const router = express.Router();

const { createToken } = require("../controllers/plaidController");

router.post("/", createToken);

module.exports = router;
