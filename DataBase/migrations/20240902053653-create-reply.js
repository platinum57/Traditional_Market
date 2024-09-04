'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reply', {
      reply_num: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: sequelize.INTEGER(10)
      },
      reply_content: {
        allowNull: false,
        type: sequelize.STRING(200)
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
      qna_num: {
        allowNull: false,
        type: sequelize.INTEGER(10),
        references: {
          model: 'Qna_board',
          key: 'qna_num'
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reply');
  }
};
