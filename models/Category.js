const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // SET ID COLUMN | PRIMARY KEY 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // SET CATEGORY NAME COLUMN
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
