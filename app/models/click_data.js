const { Model, Sequelize, DataTypes } = require('sequelize');
const dbc = require('./db.js');
const Redirect = require('./redirect.js');

class Click_Data extends Model { };

Click_Data.init({
  task_id: DataTypes.STRING(100),
  tracking_id: DataTypes.INTEGER,
  timestamp: DataTypes.DATE,
  ip_address: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  device: DataTypes.STRING(100),
  country: DataTypes.STRING(100),
  region: DataTypes.STRING(100),
  city: DataTypes.STRING(100),

  referrer_url: DataTypes.STRING(100),
  operating_system: DataTypes.STRING(100),
  browser: DataTypes.STRING(100),
  browser_language: DataTypes.STRING(100),
  screen_resolution: DataTypes.STRING(100),
  ip_lookup_status: DataTypes.STRING(100),
  region_name: DataTypes.STRING(100),
  country_code: DataTypes.STRING(100),
  isp: DataTypes.STRING(100),
  connection_type: DataTypes.STRING(100),
  network_speed: DataTypes.STRING(100),
  latitude: DataTypes.STRING(100),
  longtitude: DataTypes.STRING(100),
  zipcode: DataTypes.STRING(100),
}, {
  sequelize: dbc,
  modelName: 'Click_Data',
  tableName: 'click_datas'
});

// make association
Redirect.hasMany(Click_Data,{
  foreignKey: 'tracking_id',
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE',
});
Click_Data.belongsTo(Redirect, {
  foreignKey: 'tracking_id',
});
module.exports = Click_Data;