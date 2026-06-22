const asyncHandler = require("express-async-handler");
const { models } = require("../config/db");
const { users } = models; // Now you only deal with Users

//const Token = require("../models/tokenModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// const sendEmail = require("../utils/sendEmail");

// Function to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// --------------------------------------------------------------------
// REGISTER USER
// --------------------------------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("backend");
  console.log(username);
  console.log(password);
  if (!username || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be min 6 characters" });
  }

  const userExists = await users.findOne({ where: { username } });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await users.create({ username, password });

  const token = generateToken(user.ID);

  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),
    sameSite: "lax",
    secure: false,
  });

  res.status(201).json({
    ID: user.ID,
    username: user.username,
    token,
  });
});

// --------------------------------------------------------------------
// LOGIN USER
// --------------------------------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  console.log("credentials:", username, "  ", password);
  if (!username || !password) {
    return res.status(400).json({ message: "Please add username & password" });
  }

  const user = await users.findOne({ where: { username } });

  if (!user)
    return res.status(400).json({ message: "User not found, please sign up" });

  console.log(user.username);
  console.log(user.password);
  console.log(password);

  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  if (passwordIsCorrect) {
    const token = generateToken(user.id);
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({
      ID: user.ID,
      username: user.username,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid Username or Password" });
  }
});

// --------------------------------------------------------------------
// LOGOUT USER
// --------------------------------------------------------------------
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Successfully logged out" });
});

// --------------------------------------------------------------------
// LOGIN STATUS
// --------------------------------------------------------------------
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json(false);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    return res.json(!!verified);
  } catch {
    return res.json(false);
  }
});

// --------------------------------------------------------------------
// CHANGE PASSWORD
// --------------------------------------------------------------------
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, userID } = req.body;
  const user = await users.findByPk(userID);

  if (!user) return res.status(400).json({ message: "User not found" });
  if (!currentPassword || !newPassword)
    return res.status(400).json({ message: "Please add old and new password" });

  const passwordIsCorrect = await bcrypt.compare(
    currentPassword,
    user.password,
  );

  if (!passwordIsCorrect)
    return res.status(400).json({ message: "Current Password is incorrect" });

  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  changePassword,
};
