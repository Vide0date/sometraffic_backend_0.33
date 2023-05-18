const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");

class Project extends Model {}
Project.init(
  {
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    modelName: "Project",
  }
);

// define association here

module.exports = Project;
