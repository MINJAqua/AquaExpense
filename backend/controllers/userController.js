const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@route POST /api/users/:id
const registerUser = asyncHandler(async (req, res) => {
  const { user, email, password } = req.body;

  //Checks if all fields are filled
  if (!user || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Checks if user exists
  //If it does gives back message
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
    console.log("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Creates the user
  const profile = await User.create({
    user,
    email,
    password: hashedPassword,
  });

  if (profile) {
    res.status(201).json({
      _id: profile.id,
      user: profile.user,
      email: profile.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid");
  }
});

//Logs users into dashboard
//@route GET /api/users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //console.log(req.body);

  const user = await User.findOne({ email });

  //Compares password with encrypted password
  //If it matches log user in else sends invalid notice
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      user: user.user,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid");
  }
});

//User dashboard
//@route GET /api/users/dashboard

const userDashboard = asyncHandler(async (req, res) => {
  res.status(200).json("Hello world");
});

//Generate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, userDashboard };
