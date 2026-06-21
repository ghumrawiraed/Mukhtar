const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { models } = require("../config/db");
const { Users } = models; // Now you only deal with Users
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("COOKIES RECEIVED:", token);

  // 1) No token
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified:", decoded);
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }

  // 2) Token valid but user doesn't exist
  const user = await users.findByPk(decoded.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // 3) Attach user to req object
  req.user = user;

  next();
});

module.exports = protect;
