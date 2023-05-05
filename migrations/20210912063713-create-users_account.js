'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users_Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING(100)
      },
      email: {
        type: Sequelize.DataTypes.STRING(100),
        unique: true
      },
      
      userType: {
        type: Sequelize.ENUM,
        values: ['Administrator', 'Moderator', 'User']
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};