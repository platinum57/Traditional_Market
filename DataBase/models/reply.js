'use strict';
const { Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: 'user'
      });
      Reply.belongsTo(models.Qna_board, {
        foreignKey: "qna_num",
        as: "post"
      })
    }
  }
  Reply.init({
    reply_num: {
      type : DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement:true
    },
    reply_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull:false,
      references: { 
        model: 'Users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    qna_num: {
      type : DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Qna_board",
        key: "qna_num"
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Reply',
    freezeTableName: true,
  });
  return Reply;
};