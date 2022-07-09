const { category } = require("../../db.js");

/**
 *  Creates categories in the database
 *
 * @author Andres
 */

let createCategory = async (name) => {
  try {
    return await category.create({
      name:name.toUpperCase(),
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

 let findCategories = async () =>{
    try {
        return await category.findAll({}); 
    } catch (error) {
        console.log(error)
        return error.message;
    }
}

let findName = async (name) => {
  try {
    return await category.findOne({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
      },
    });
  } catch (error) {
    return error;
  }
};

/**
 * Function to create category if it does not exist
 *
 * @author Andres
 */

let findNameOrCreateCategory = async (name, id) => {
  try {
    return await category.findOrCreate({
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
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}


module.exports = {
  createCategory,
  findNameOrCreateCategory,
  findCategories,
  findName
};
