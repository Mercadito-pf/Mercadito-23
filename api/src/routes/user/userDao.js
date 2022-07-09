const { user } = require("../../db.js");
const { findName } = require('../place/placeDao.js');
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */

let createUser = async(name, lastname, password, dni, profile_picture, email, phone, typeUser, address, placeName) =>{
    try {
        let place = await findName(placeName);
        return await user.create({
            name: eliminarDiacriticos(name).toUpperCase(),
            lastname: eliminarDiacriticos(lastname).toUpperCase(),
            password: password,
            dni: dni,
            profile_picture: profile_picture,
            email: email,
            phone: phone,
            typeUser: typeUser,
            address: address,
            placeId: place.dataValues.id
          });
    } catch (error) {
        return error
    }
}

/**
 * find user per name

 */

 let searchUser = async(name) =>{
    try {
        return await user.findOne({
            where: {
                name: eliminarDiacriticos(name).toUpperCase(),
            } 
        })
    } catch (error) {
        return error
    }
}

function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

module.exports = {
    createUser,
    searchUser
}