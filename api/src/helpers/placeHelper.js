const { Place } = require("../db");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */
/**
 * creates a Place in the database based on two
 * attributes that enter, name and id of the
 * location where the Place is located
 */
let createPlace = async (name, located) => {
  try {
    name = name.toUpperCase();
    located = located?.toUpperCase();
    return await Place.create({
      name,
      located,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
/**
 * search for a Place by name
 * @param {*} name
 * @returns
 */
let findName = async (name) => {
  try {
    return await Place.findOne({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
      },
    });
  } catch (error) {
    return false;
  }
};
/**
 * Search for a Place by name, if not, it creates it
 * @param {*} name
 * @param {*} id
 * @returns
 */
let findNameOrCreate = async (name, id) => {
  try {
    return await Place.findOrCreate({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
        located: id,
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
  createPlace,
  findName,
  findNameOrCreate,
};
