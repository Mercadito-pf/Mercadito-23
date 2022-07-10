require("dotenv").config();
const { Sequelize } = require("sequelize");
const modelPlace = require("./models/Place.js");
const modelUser = require("./models/User.js");
const modelProduct = require("./models/Product.js");
const modelCategory = require("./models/Category.js");
const modelComment = require("./models/Comment.js");
const modelOder = require("./models/Order.js");
const modelQualification = require("./models/Qualification.js");
const modelImg = require("./models/Img.js");
const modelSize = require("./models/Size.js");
/**
 * @author Nicolas Alejandro Suarez
 */
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mercadito`,
  {
    logging: false,
    native: false,
  }
);
/**
 * Create models in database
 */
modelPlace(sequelize);
modelUser(sequelize);
modelProduct(sequelize);
modelCategory(sequelize);
modelComment(sequelize);
modelUser(sequelize);
modelOder(sequelize);
modelQualification(sequelize);
modelImg(sequelize);
modelSize(sequelize);

/**
 * create relationship
 */
const {
  Place,
  Product,
  Category,
  Comment,
  User,
  Order,
  Qualification,
  Img,
  Size,
} = sequelize.models;

Place.hasMany(Place, { foreignKey: "located" });
User.belongsTo(Place);
Place.hasMany(User);
Category.hasMany(Category, { foreignKey: "subCategory" });
Product.hasMany(Comment);
Comment.belongsTo(Product);

Product.hasMany(Img);
Img.belongsTo(Product);

Product.belongsToMany(Size, { through: "Product_Size" });
Size.belongsToMany(Product, { through: "Product_Size" });

User.hasMany(Product);
Product.belongsTo(User);

User.belongsToMany(Product, { through: "shoppingcart" });
Product.belongsToMany(User, { through: "shoppingcart" });

User.belongsToMany(Product, { as: "favorite", through: "Favorites" });
Product.belongsToMany(User, { through: "Favorites" });

Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

User.belongsToMany(Product, { through: Order });
Product.belongsToMany(User, { through: Order });

User.belongsToMany(Product, { through: Qualification });
Product.belongsToMany(User, { through: Qualification });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
