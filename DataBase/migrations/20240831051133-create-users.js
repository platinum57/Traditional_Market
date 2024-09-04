'use strict';

const { sequelize, Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.STRING(50)
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(80)
      },
      city: {
        type: Sequelize.STRING(50)
      },
      auth: {
        allowNull: false,
        type: Sequelize.INTEGER(8)
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

  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'city', {
      type: Sequelize.STRING
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'city');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};