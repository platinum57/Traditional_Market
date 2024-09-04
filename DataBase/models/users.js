'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Qna_board, {
        foreignKey: "user_id",
        as: "qnaBoard"
      });
      Users.hasMany(models.Reply, {
        foreignKey: "user_id",
        as: "replies"
      });
      Users.hasMany(models.Notice, {
        foreignKey: "user_id",
        as: "notice"
      });
    }
  }
  Users.init({
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type : DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
    },
    auth: {
      type: DataTypes.ENUM('admin','user'),
      defaultValue: 'user',
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true
  });
  return Users;
};