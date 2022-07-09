const { product, category, size, img } = require("../../db.js");
const { searchUser } = require('../user/userDao.js')
const { createImg } = require('../img/imgDao.js');
const { findName } = require('../category/categoryDao.js');
const { findName: findSize  } = require('../size/sizeDao.js');

/**
 * @author Nicolas Alejandro Suarez
 * este metodo se debe refactorizar cuando el front este  bien elaborado puesto
 * que una ves el front este bien elaborado  no deberia llegar un bombre de usuario sino el id que ellos 
 * al logerase por supuesto deben tener en el cookies;
 * @param {} sequelize 
 */

let createProduct = async(name, description, unit_price, state, QUANTITY_STOCK, user, images, category, sizes) =>{
 try{
    let imgMap = images.map(async (e) =>  await createImg(e));
    let resp = await Promise.all(imgMap);
    let userID = await searchUser(user);

    const newProduct = await product.create({
        name: eliminarDiacriticos(name).toUpperCase(),
        description: eliminarDiacriticos(description).toUpperCase(),
        unit_price: unit_price,
        state: state,
        QUANTITY_STOCK: QUANTITY_STOCK,
        userId: userID.dataValues.id,
    });

    resp.map(async e => await e.setProduct(newProduct));
   
   for(let i = 0; i < category.length; i++){
        let  promise = await findName(category[i]);
        await newProduct.addCategory(promise);
    }
    if(sizes.length > 0){
        for(let i = 0; i < sizes.length; i++){
            let  promiseS   = await findSize(sizes[i]);
            await newProduct.addSize(promiseS)  ;  
        } 
    }
    return newProduct;
    } catch (error) {
        return false;
    }
}

let getAllProduct = async() => {
    try {
        return await product.findAll({
            include: [{
                model: category,
                attributes: ["name"],
                through: {
                  attributes: []
                }
              },
              {
                  model:img,
                  attributes:["path"],
              },
              {
                model:size,
                attributes:["size"],
                through: {
                    attributes: []
                }
            }
            ]
        }); 
    } catch (error) {
        return error.message;
    }
}

function eliminarDiacriticos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

module.exports = {
    createProduct,
    getAllProduct
}