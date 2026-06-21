const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "list",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "الأسم",
      },

      father_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "اسم الأب",
      },
      family_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "الشهرة",
      },
      mother_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: "اسم الأم",
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "تاريخ الميلاد",
      },
      sex: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "الجنس",
      },

      record_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "رقم السجل",
      },
    },
    {
      sequelize,
      tableName: "list",
      timestamps: false,
    },
  );
};
