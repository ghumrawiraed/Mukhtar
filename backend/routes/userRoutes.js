const express = require("express");
const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  loginStatus,
  changePassword,
} = require("../controllers/userController");
const { models } = require("../config/db");
const { users } = models;

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/loggedin", loginStatus);
router.patch("/changepass", changePassword);
module.exports = router;
