const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");
// const Project = require("./project.js");
// const Category_Item = require('./category_item.js')

class Joined_Group extends Model {}
Joined_Group.init(
  {
  },
  {
    sequelize: dbc,
    modelName: "Joined_Group",
  }
);

Joined_Group.sync({alter: true})
module.exports = Joined_Group;
