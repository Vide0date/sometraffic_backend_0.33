const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");
const Users_Account = require("./users_account.js");

class Users_Group extends Model {}
Users_Group.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: DataTypes.TEXT,
  },
  {
    sequelize: dbc,
    modelName: "Users_Group",
  }
);

// define association here
Users_Account.hasMany(Users_Group, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Users_Group.belongsTo(Users_Account, {
  foreignKey: "user_id",
});

module.exports = Users_Group;
