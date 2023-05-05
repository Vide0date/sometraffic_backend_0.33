'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Click_Datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.DataTypes.STRING(100)
      },
      tracking_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'Redirects',
          key: 'id'
        }
      },
      timestamp: {
        type: Sequelize.DATE
      },
      ip_address: {
        type: Sequelize.DataTypes.STRING(100)
      },
      device: {
        type: Sequelize.DataTypes.STRING(100)
      },
      country: {
        type: Sequelize.DataTypes.STRING(100)
      },
      region: {
        type: Sequelize.DataTypes.STRING(100)
      },
      city: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Click_Datas');
  }
};