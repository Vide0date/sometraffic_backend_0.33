'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Category_Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.DataTypes.STRING(100)
      },
      unique_identifier: {
        type: Sequelize.DataTypes.STRING(100)
      },
      timestamp: {
        type: Sequelize.DATE
      },
      category: {
        type: Sequelize.DataTypes.STRING(100)
      },
      information: {
        type: Sequelize.TEXT
      },
      item_title: {
        type: Sequelize.DataTypes.STRING(100)
      },
      priority: {
        type: Sequelize.DataTypes.STRING(100)
      },
      cat_group: {
        type: Sequelize.DataTypes.STRING(100)
      },
      visibility: {
        type: Sequelize.DataTypes.STRING(100)
      },
      plan_frequency: Sequelize.INTEGER,
      automatic_status: {
        type: Sequelize.DataTypes.STRING(100)
      },
      url_1_link: {
        type: Sequelize.DataTypes.STRING(100)
      },
      url_2_txt: {
        type: Sequelize.DataTypes.STRING(100)
      },
      url_2_link: {
        type: Sequelize.DataTypes.STRING(100)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Category_Items');
  }
};
