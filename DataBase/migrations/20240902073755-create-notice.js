'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notice', {
      notice_num: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER(10)
      },
      notice_title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      notice_content: {
        type: Sequelize.STRING(1000),
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING(50),
        references: {
          model: 'User',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Notice');
  }
};