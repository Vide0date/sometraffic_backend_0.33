const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");
const Category_Item = require("./category_item.js");

class Information_Item extends Model {}

Information_Item.init(
  {
    item_id: DataTypes.STRING(100),
    category_item_id: DataTypes.INTEGER,
    username: DataTypes.STRING(100),
    timestamp: DataTypes.DATE,
    information: DataTypes.TEXT,
    url_1_txt: DataTypes.STRING(100),
    url_1_link: DataTypes.STRING(100),
    url_2_txt: DataTypes.STRING(100),
    url_2_link: DataTypes.STRING(100),
    posts_per_month: DataTypes.INTEGER,
    posts_today: DataTypes.INTEGER,
    members_total: DataTypes.INTEGER,
    members_new: DataTypes.INTEGER,
  },
  {
    sequelize: dbc,
    modelName: "Information_Item",
    tableName: "information_items",
  }
);

// make association
Category_Item.hasMany(Information_Item, {
  foreignKey: "category_item_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Information_Item.belongsTo(Category_Item, {
  foreignKey: "category_item_id",
});

module.exports = Information_Item;
