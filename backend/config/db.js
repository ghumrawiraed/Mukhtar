const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models"); // Path to the file you're talking about

// 1. Create the connection
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  },
);

// 2. Pass the connection to the "Brain" (initModels)
// This returns an object containing all your tables (e.g., models.Users, models.Orders)
const models = initModels(sequelize);

// 3. Export both the connection and the models
module.exports = { sequelize, models };
