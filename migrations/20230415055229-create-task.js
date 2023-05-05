"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.DataTypes.STRING(100),
      },
      timestamp: {
        type: Sequelize.DATE,
      },
      task_id: {
        type: Sequelize.DataTypes.STRING(100),
      },
      category_item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Category_Items",
          key: "id",
        },
      },
      information: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.DataTypes.STRING(100),
      },
      priority: {
        type: Sequelize.DataTypes.STRING(100),
      },
      due_date_time: {
        type: Sequelize.DATE,
      },
      email_notification: {
        type: Sequelize.DataTypes.BOOLEAN,
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
      status: {
        type: Sequelize.DataTypes.STRING(100),
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
    await queryInterface.dropTable("Tasks");
  },
};
