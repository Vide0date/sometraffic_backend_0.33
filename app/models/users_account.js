const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");

class Users_Account extends Model {}

Users_Account.init(
  {
    userName: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    userType: {
      type: DataTypes.ENUM("Administrator", "Moderator", "User"),
      defaultValue: "User",
    },
    AccountId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: dbc,
    modelName: "Users_Account",
  }
);

// define association here

module.exports = Users_Account;
