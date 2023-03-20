const express = require("express");
const router = express.Router();
const {
  getExpenses,
  setExpense,
  setPlaidExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getExpenses).post(setExpense);
router.route("/plaidExpense").post(setPlaidExpense);
router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
