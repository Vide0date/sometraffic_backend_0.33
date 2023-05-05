const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");
const Category_Item = require("./category_item.js");

class Task extends Model {}

Task.init(
  {
    username: DataTypes.STRING(100),
    timestamp: DataTypes.DATE,
    task_id: DataTypes.STRING(100),
    category_item_id: DataTypes.INTEGER,
    information: DataTypes.TEXT,
    title: DataTypes.STRING(100),
    priority: DataTypes.STRING(100),
    due_date_time: DataTypes.DATE,
    email_notification: DataTypes.BOOLEAN,
    url_1_txt: DataTypes.STRING(100),
    url_1_link: DataTypes.STRING(100),
    url_2_txt: DataTypes.STRING(100),
    url_2_link: DataTypes.STRING(100),
    status: DataTypes.STRING(100),
  },
  {
    sequelize: dbc,
    modelName: "Task",
    tableName: "tasks",
  }
);

// make association
Category_Item.hasMany(Task, {
  foreignKey: "category_item_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Task.belongsTo(Category_Item, {
  foreignKey: "category_item_id",
});

module.exports = Task;
