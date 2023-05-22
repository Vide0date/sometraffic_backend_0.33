const { Model, Sequelize, DataTypes } = require("sequelize")
const dbc = require("./db.js")
const Users_Account = require("./users_account.js")
const Users_Group = require("./users_group.js")
const Project = require("./project.js")
const Category_Item = require("./category_item.js")

class Account extends Model {}
Account.init(
  {
    createdBy: {
      type: DataTypes.STRING(100),
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
    description: DataTypes.TEXT,
  },
  {
    sequelize: dbc,
    modelName: "Account",
  }
)

// define association here
Account.hasOne(Users_Account)
Users_Account.belongsTo(Account)

Account.sync({ alter: true }).then(() => {
  console.log("Account Table created/altered successfully!")

  Users_Account.sync({ alter: true }).then(() => {
    console.log("Users Account Table created/altered successfully!")
    Account.hasMany(Project, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    })
    Project.belongsTo(Account)

    Project.sync({ alter: true }).then(() => {
      console.log("project table altered/created successfully")
      // define association here
      Project.hasMany(Users_Group, {
        // foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
      Users_Group.belongsTo(Project, {
        // foreignKey: "user_id",
      })
      Users_Group.sync({ alter: true }).then(() => {
        Users_Group.hasMany(Category_Item, {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        })
        Category_Item.belongsTo(Users_Group, {
          foreignKey: "cat_group",
        })

        Category_Item.sync({ alter: true })
      })
    })
  })
})

module.exports = Account
