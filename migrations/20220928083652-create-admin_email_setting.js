'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Admin_Email_Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.DataTypes.STRING(100)
      },
      password: {
        type: Sequelize.DataTypes.STRING(100)
      },
      sender: {
        type: Sequelize.DataTypes.STRING(100)
      },
      incoming_mail: {
        type: Sequelize.DataTypes.STRING(100)
      },
      outgoing_mail: {
        type: Sequelize.DataTypes.STRING(100)
      },
      s_imap_port: {
        type: Sequelize.INTEGER
      },
      s_pop3_port: {
        type: Sequelize.INTEGER
      },
      s_smtp_port: {
        type: Sequelize.INTEGER
      },
      n_imap_port: {
        type: Sequelize.INTEGER
      },
      n_pop3_port: {
        type: Sequelize.INTEGER
      },
      n_smtp_port: {
        type: Sequelize.INTEGER
      },
      webmail_url: {
        type: Sequelize.DataTypes.STRING(100)
      },
      technical_information: {
        type: Sequelize.DataTypes.STRING(100)
      },
      information: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('AdminEmailSettings');
  }
};