require('dotenv').config();
const { Sequelize } = require('sequelize');
const modelPlace = require('./models/place.js');
const modelUser = require('./models/user.js');
const modelProduct = require('./models/product.js');
const modelCategory = require('./models/category.js');
const modelComment = require('./models/comment.js');
const modelOder = require('./models/order.js');
const modelQualification = require('./models/qualification.js');
const modelImg = require('./models/img.js');
const modelSize = require('./models/size.js');
/**
 * @author Nicolas Alejandro Suarez
 */
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mercadito`, {
  logging: false,
  native: false,
});
/**
 * Create models in database
 */
modelPlace (sequelize)
modelUser (sequelize)
modelProduct (sequelize)
modelCategory (sequelize)
modelComment (sequelize)
modelUser(sequelize);
modelOder(sequelize);
modelQualification(sequelize);
modelImg(sequelize);
modelSize(sequelize);

/**
 * create relationship
 */
const {place,  product, category, comment, user, order, qualification, img, size } = sequelize.models;

place.hasMany(place,  {foreignKey: 'located'});
user.belongsTo(place);
place.hasMany(user);
category.hasMany(category,  {foreignKey: 'subCategory'});
product.hasMany(comment);
comment.belongsTo(product);

product.hasMany(img);
img.belongsTo(product);

product.belongsToMany(size, {through: 'Product_Size'});
size.belongsToMany(product, {through: 'Product_Size'});

user.hasMany(product);
product.belongsTo(user);

user.belongsToMany(product, {through: 'shoppingcart'});
product.belongsToMany(user, {through: 'shoppingcart'});

user.belongsToMany(product, {through: 'favorites'});
product.belongsToMany(user, {through: 'favorites'});

product.belongsToMany(category, {through: 'Product_Category'});
category.belongsToMany(product, {through: 'Product_Category'});

user.belongsToMany(product, { through: order });
product.belongsToMany(user, {through: order});

user.belongsToMany(product, { through: qualification });
product.belongsToMany(user, {through: qualification});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,    
};