const { Img } = require("../db");

/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */

let createImg = async (path) => {
  try {
    return Img.create({
      path: path,
    });
  } catch (error) {
    return error;
  }
};
module.exports = {
  createImg,
};
