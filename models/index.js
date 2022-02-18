// IMPORT MODELS
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// PRODUCTS BELONGS TO CATEGORY
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

// CATEGORIES HAVE MANY PRODUCTS
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// PRODUCTS BELONG-TO-MANY TAGS (THROUGH PRODUCT-TAG)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})

// TAGS BELONG-TO-MANY PRODUCTS (THROUGH PRODUCT-TAG)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
