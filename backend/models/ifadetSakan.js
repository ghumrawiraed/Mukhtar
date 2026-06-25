const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ifadet_sakan",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },

      certificate_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "الأسم",
      },

      given_for: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "أعطيت لأجل",
      },
    },
    {
      sequelize,
      tableName: "ifadet-sakan",
      timestamps: false,
    },
  );
};
