'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn(
        'Click_Datas', // table name
        'referrer_url', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'operating_system', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'browser', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'browser_language', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'screen_resolution', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'ip_lookup_status', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'region_name', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'country_code', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'isp', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'connection_type', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'network_speed', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'latitude', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'longtitude', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Click_Datas', // table name
        'zipcode', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Click_Datas', 'referrer_url'),
      queryInterface.removeColumn('Click_Datas', 'operating_system'),
      queryInterface.removeColumn('Click_Datas', 'browser'),
      queryInterface.removeColumn('Click_Datas', 'browser_language'),
      queryInterface.removeColumn('Click_Datas', 'screen_resolution'),
      queryInterface.removeColumn('Click_Datas', 'ip_lookup_status'),
      queryInterface.removeColumn('Click_Datas', 'region_name'),
      queryInterface.removeColumn('Click_Datas', 'country_code'),
      queryInterface.removeColumn('Click_Datas', 'isp'),
      queryInterface.removeColumn('Click_Datas', 'connection_type'),
      queryInterface.removeColumn('Click_Datas', 'network_speed'),
      queryInterface.removeColumn('Click_Datas', 'latitude'),
      queryInterface.removeColumn('Click_Datas', 'longtitude'),
      queryInterface.removeColumn('Click_Datas', 'zipcode'),
    ]);
  }
};
