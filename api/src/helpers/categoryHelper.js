const { Category } = require("../db.js");

/**
 *  Creates categories in the database
 *
 * @author Andres
 */

let createCategory = async (name) => {
  try {
    return await Category.create({
      name: name.toUpperCase(),
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * Find Categories
 *
 * @author Andres
 */

let findCategories = async () => {
  try {
    return await Category.findAll({});
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

let findName = async (name) => {
  try {
    return await Category.findOne({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
      },
    });
  } catch (error) {
    return error;
  }
};

/**
 * Function to create Category if it does not exist
 *
 * @author Andres
 */

let findNameOrCreateCategory = async (name, id) => {
  try {
    return await Category.findOrCreate({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
        subCategory: id ? id : null,
      },
    });
  } catch (error) {
    return false;
  }
};

/**
 * Remove ´, (), ñ, +, example: BOYACÁ => BOYACA
 * @param {} texto
 * @returns
 */
function eliminarDiacriticos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
  createCategory,
  findNameOrCreateCategory,
  findCategories,
  findName,
};
