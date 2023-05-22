const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users_accounts = require("./users_account.js");

db.admin_email_settings = require("./admin_email_setting.js");
db.redirects = require("./redirect.js");
db.click_datas = require("./click_data.js");
db.category_items = require("./category_item.js");
db.information_items = require("./information_item.js");
db.tasks = require("./task.js");
db.users_groups = require("./users_group.js");
db.accounts = require("./account.js")
db.projects = require("./project.js")
db.joined_groups = require("./joined-groups.js")

module.exports = db;
