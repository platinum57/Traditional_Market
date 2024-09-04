'use strict';
const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Notice extends Model {
    static associate(models) {
      Notice.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Notice.init({
    notice_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    notice_title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    notice_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Notice',
    freezeTableName: true
  });
  return Notice;
};