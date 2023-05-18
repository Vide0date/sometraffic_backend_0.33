const { Model, Sequelize, DataTypes } = require('sequelize');
const dbc = require('./db.js');

class Category_Item extends Model { };

Category_Item.init({
	username: DataTypes.STRING(100),
	unique_identifier: DataTypes.STRING(100),
	timestamp: DataTypes.DATE,
	category: DataTypes.STRING(100),
	information: DataTypes.TEXT,
	item_title: DataTypes.STRING(100),
	priority: DataTypes.STRING(100),
	cat_group: DataTypes.INTEGER,
	visibility: DataTypes.STRING(100),
	plan_frequency: DataTypes.INTEGER,
	automatic_status: DataTypes.STRING(100),
	url_1_link: DataTypes.STRING(100),
	url_2_txt: DataTypes.STRING(100),
	url_2_link: DataTypes.STRING(100),
}, {
  sequelize: dbc,
  modelName: 'Category_Item',
  tableName: 'category_items'
});

// make association
module.exports = Category_Item;