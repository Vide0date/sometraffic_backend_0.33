const { Model, Sequelize, DataTypes } = require('sequelize');
const dbc = require('./db.js');

class Redirect extends Model { };

Redirect.init({
  tracking_url: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  destination_url: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  task_id: {
    type: Sequelize.DataTypes.STRING(100),
  },
  seo_title: {
    type: Sequelize.DataTypes.STRING(100),
  },
  seo_description: {
    type: Sequelize.DataTypes.STRING,
  },
  seo_image_url: {
    type: Sequelize.DataTypes.STRING,
  },
}, {
  sequelize: dbc,
  modelName: 'Redirect',
});
module.exports = Redirect;