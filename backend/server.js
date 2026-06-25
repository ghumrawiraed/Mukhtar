const dotenv = require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/db");

const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/errorMiddleware");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const app = express();

const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Middlewares

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/templates", express.static("templates"));

//Error Middleware
app.use(errorHandler);


app.use("/api/list", listRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

const backupDir = path.join(__dirname, "backups");

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

  app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("Test OK");
});

sequelize
  .authenticate()

  .then(() => {
    console.log("MySQL Connected Successfully");

    // Sync models (optional)
    return sequelize.sync(); // or { alter: true }
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MySQL Connection Error:", err);
  });

