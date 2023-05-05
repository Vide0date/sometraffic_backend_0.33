const { Model, Sequelize, DataTypes } = require("sequelize");
const dbc = require("./db.js");

class Admin_Email_Settings extends Model {}

Admin_Email_Settings.init({
  id: {type: DataTypes.INTEGER, primaryKey: true},
  email: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  sender: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  incoming_mail: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  outgoing_mail: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  s_imap_port: DataTypes.INTEGER,
  s_pop3_port: DataTypes.INTEGER,
  s_smtp_port: DataTypes.INTEGER,
  n_imap_port: DataTypes.INTEGER,
  n_pop3_port: DataTypes.INTEGER,
  n_smtp_port: DataTypes.INTEGER,
  webmail_url: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  technical_information: {
    type: Sequelize.DataTypes.STRING(100),
    allowNull: false
  },
  information: DataTypes.TEXT,
}, {
  sequelize: dbc,
  modelName: "Admin_Email_Settings",
});

module.exports = Admin_Email_Settings;