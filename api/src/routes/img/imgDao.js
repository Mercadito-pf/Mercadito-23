const { img } = require("../../db.js");

/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */

let createImg = async(path) =>{
    try{
        return img.create({
            path: path,
        })
     } catch (error) {
         return error
     }
 }
 module.exports = {
    createImg,
 }