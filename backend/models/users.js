const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define(
    "users",
    {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "اسم المستخدم",
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "كلمة المرور",
      },
    },
    {
      tableName: "users",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "ID" }],
        },
      ],

      hooks: {
        // Hash password before insert
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        // Hash password before update (only if changed)
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    },
  );

  // Method to compare passwords

  Users.prototype.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  };
  return Users;
};
