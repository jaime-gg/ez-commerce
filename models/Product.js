const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
  {
    // SET ID COLUMN | PRIMARY KEY 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // SET PRODUCT NAME COLUMN
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // SET PRICE COLUMN | REQUIRES DECIMAL THAT HAS A VALUE OF #.##
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    // SET STOCK COLUMN | REQUIRES A NUMBER THAT HAS A DEFAULT VALUE OF 10
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10, 
      validate: {
        isNumeric: true
      }
    },
    // COLUMN THAT REFERENCES THE 'CATEGORY' MODEL'S PRIMARY KEY
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
