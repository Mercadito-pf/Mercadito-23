const { Size } = require("../../db.js");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */

/**
 * creates a Size in the database 
 */
 let createSize = async (sizeName) => {
    try {
        sizeName = sizeName.toUpperCase();
        return await Size.create({
            size: sizeName
        });
    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 * search for a Size by name
 * @param {*} name 
 * @returns 
 */
let findName = async (sizeName) =>{
    try {
        return await Size.findOne({ 
            where: {
                size: eliminarDiacriticos(sizeName).toUpperCase()
            } 
        }); 
    } catch (error) {
        return false;
    }
}
/**
 * Search for a Size by name, if not, it creates it
 * @param {*} name 
 * @param {*} id 
 * @returns 
 */
let findNameOrCreate = async (sizeName) =>{
    try {
        return await Size.findOrCreate({
            where: {
                Size: eliminarDiacriticos(sizeName).toUpperCase()
            }
          });
    } catch (error) {
        return false;
    }
}

/**
 * Remove ´, (), ñ, +, example: BOYACÁ => BOYACA
 * @param {} texto 
 * @returns 
 */
function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

module.exports = {
    createSize,
    findName,
    findNameOrCreate
}