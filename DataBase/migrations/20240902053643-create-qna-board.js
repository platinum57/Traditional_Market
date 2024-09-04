'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Qna_board', {
      qna_num: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER(10)
      },
      qna_title: {
        allowNull: false,
        type: sequelize.STRING(100)
      },
      qna_content: {
        allowNull: false,
        type: sequelize.STRING(500)
      },
      user_id: {
        allowNull: false,
        type: sequelize.STRING(50),
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
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Qna-board');
  }
};
