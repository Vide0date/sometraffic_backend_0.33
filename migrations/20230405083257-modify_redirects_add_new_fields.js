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
        'Redirects', // table name
        'seo_title', // new field name
        {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Redirects', // table name
        'seo_description', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Redirects', // table name
        'seo_image_url', // new field name
        {
          type: Sequelize.STRING,
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
      queryInterface.removeColumn('Redirects', 'seo_title'),
      queryInterface.removeColumn('Redirects', 'seo_description'),
      queryInterface.removeColumn('Redirects', 'seo_image_url'),
    ]);
  }
};
