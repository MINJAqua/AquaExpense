const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userDashboard,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);

router.get("/dashboard", protect, userDashboard);

module.exports = router;
