const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");
// const Project = require("./project.js");
// const Category_Item = require('./category_item.js')

class Users_Group extends Model {}
Users_Group.init(
  {
    ProjectId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    unique_identifier: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdBy: {
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


module.exports = Users_Group;
