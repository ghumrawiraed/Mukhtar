var DataTypes = require("sequelize").DataTypes;
var _users = require("./users");
var _resident = require("./resident");

function initModels(sequelize) {
  var users = _users(sequelize, DataTypes);
  var resident = _resident(sequelize, DataTypes);

  return { users, resident };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
