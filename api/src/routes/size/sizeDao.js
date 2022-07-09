const { size } = require("../../db.js");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */

/**
 * creates a size in the database 
 */
 let createSize = async (sizeName) => {
    try {
        sizeName = sizeName.toUpperCase();
        return await size.create({
            size: sizeName
        });
    } catch (error) {
        console.log(error)
        return false
    }
}

/**
 * search for a size by name
 * @param {*} name 
 * @returns 
 */
let findName = async (sizeName) =>{
    try {
        return await size.findOne({ 
            where: {
                size: eliminarDiacriticos(sizeName).toUpperCase()
            } 
        }); 
    } catch (error) {
        return false;
    }
}
/**
 * Search for a size by name, if not, it creates it
 * @param {*} name 
 * @param {*} id 
 * @returns 
 */
let findNameOrCreate = async (sizeName) =>{
    try {
        return await size.findOrCreate({
            where: {
                size: eliminarDiacriticos(sizeName).toUpperCase()
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