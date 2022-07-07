require('dotenv').config();
const { Sequelize } = require('sequelize');
const modelType_place = require('./models/type_place.js');
const modelPlace = require('./models/place.js');
const modelUser = require('./models/user.js');
const modelCategory = require('./models/category.js');
const modelProduct = require('./models/product.js');
const modelComment = require('./models/comment.js');
const modelOder = require('./models/order.js');
const modelQualification = require('./models/qualification.js');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mercadito`, {
  logging: false,
  native: false,
});
//crea modelos
modelType_place (sequelize)
modelPlace (sequelize)
modelUser (sequelize)
modelCategory (sequelize)
modelProduct (sequelize)
modelComment (sequelize)
modelUser(sequelize);
modelOder(sequelize);
modelQualification(sequelize);
const { type_place, place, category, product, comment, user, order, qualification } = sequelize.models;

place.belongsTo(type_place);
type_place.hasMany(place);
place.hasMany(place,  {foreignKey: 'located'});
user.belongsTo(place);
place.hasMany(user);
category.hasMany(product);
category.hasMany(category,  {foreignKey: 'subCategory'});
product.belongsTo(category);
product.hasMany(comment);
comment.belongsTo(product);
user.hasMany(product);
product.belongsTo(user);

user.belongsToMany(product, {through: 'shoppingcart'});
product.belongsToMany(user, {through: 'shoppingcart'});

user.belongsToMany(product, {through: 'favorites'});
product.belongsToMany(user, {through: 'favorites'});

user.belongsToMany(product, { through: order });
product.belongsToMany(user, {through: order});

user.belongsToMany(product, { through: qualification });
product.belongsToMany(user, {through: qualification});

module.exports = {
  ...sequelize.models, 
  conn: sequelize,    
};