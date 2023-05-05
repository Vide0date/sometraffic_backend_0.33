"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Information_Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item_id: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      category_item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Category_Items",
          key: "id",
        },
        allowNull: false
      },
      username: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false
      },
      information: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      url_1_txt: {
        type: Sequelize.DataTypes.STRING(100),
      },
      url_1_link: {
        type: Sequelize.DataTypes.STRING(100),
      },
      url_2_txt: {
        type: Sequelize.DataTypes.STRING(100),
      },
      url_2_link: {
        type: Sequelize.DataTypes.STRING(100),
      },
      posts_per_month: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      posts_today: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      members_total: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      members_new: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Information_Items');
  },
};
