'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Qna_board extends Model {
    static associate(models) {
      Qna_board.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: 'user'
      });
      Qna_board.hasMany(models.Reply, {
        foreignKey: "qna_num",
        as: 'post'
      })
    }
  }
  Qna_board.init({
    qna_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    qna_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qna_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key : 'user_id',
      },
      onUpdate : 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Qna_board',
    freezeTableName: true,
  });
  return Qna_board;
};