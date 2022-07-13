const { Product, Category, Size, Img, User } = require("../db.js");
const { searchUser } = require("./userHelper");
const { createImg } = require("./imgHelper");
const { findName } = require("./categoryHelper");
const { findName: findSize } = require("./sizeHelper");
const { Op } = require("sequelize");

/**
 * @author Nicolas Alejandro Suarez
 * este metodo se debe refactorizar cuando el front este  bien elaborado puesto
 * que una ves el front este bien elaborado  no deberia llegar un bombre de usuario sino el id que ellos
 * al logerase por supuesto deben tener en el cookies;
 * @param {} sequelize
 */

let createProduct = async (
  name,
  description,
  unit_price,
  state,
  QUANTITY_STOCK,
  user,
  images,
  category,
  sizes
) => {
  try {
    let imgMap = images.map(async (e) => await createImg(e));
    let resp = await Promise.all(imgMap);
    let userID = await searchUser(user);

    const newProduct = await Product.create({
      name: eliminarDiacriticos(name).toUpperCase(),
      description: eliminarDiacriticos(description).toUpperCase(),
      unit_price: unit_price,
      state: state,
      QUANTITY_STOCK: QUANTITY_STOCK,
      UserId: userID.dataValues.id,
    });

    resp.map(async (e) => await e.setProduct(newProduct));

    for (let i = 0; i < category.length; i++) {
      let promise = await findName(category[i]);
      await newProduct.addCategory(promise);
    }
    if (sizes.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let promiseS = await findSize(sizes[i]);
        await newProduct.addSize(promiseS);
      }
    }
    return newProduct;
  } catch (error) {
    return false;
  }
};

/**
 * @author Nicolas Alejandro Suarez
 * this method receives how many elements it wants per page and which page 
 * it wants and returns the elements of that page along with the page number 
 * and how many pages there are.
 * @param {} sequelize
 */


let getAllProduct = async(offset=0, limit=10)=>{
  try {
    const count = await Product.count({});
    let products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Img,
          attributes: ["path"],
        },
        {
          model: Size,
          attributes: ["size"],
          through: {
            attributes: [],
          },
        },
      ],
     offset: offset*limit, 
     limit: limit 
    });
    return {
      products: products,
      numberPages: Math.ceil(count/limit),
      currentPage: offset
    }
  } catch (error) {
    return error.message;
  }
} 

/**
 * @author Andres
 * Método para filtrar por name los productos
 * @refactor Nicolas Suarez
 * @param {} sequelize
 */

let getAllProductName = async (name, offset=0, limit=10) => {
  try {
    const count = await Product.count({where: { name: { [Op.iLike]: `%${name}%` } }});
    name = name.toUpperCase();
    let products = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Img,
          attributes: ["path"],
        },
        {
          model: Size,
          attributes: ["size"],
          through: {
            attributes: [],
          },
        },
      ],
    offset: offset*limit, 
     limit: limit 
    });
    return {
      products: products,
      numberPages: Math.ceil(count/limit),
      currentPage: offset
    }
  } catch (error) {
    return error.message;
  }
};

let getProduct = async (id) => {
  try {
    return await Product.findOne({
      where: { id },
      include: [
        {
          model: Category,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Img,
          attributes: ["path"],
        },
        {
          model: Size,
          attributes: ["size"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } catch (error) {
    return error.message;
  }
};

function eliminarDiacriticos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
  createProduct,
  getAllProduct,
  getAllProductName,
  getProduct,
};
