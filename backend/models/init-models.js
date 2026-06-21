var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _list = require("./list");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var list = _list(sequelize, DataTypes);

  return { users, list };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
