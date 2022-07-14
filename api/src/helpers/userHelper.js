const { User, Product, Size, Category, Img } = require("../db.js");
const { findName } = require("./placeHelper");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */

let createUser = async (
  name,
  lastname,
  password,
  dni,
  profile_picture,
  email,
  phone,
  typeUser,
  address,
  placeName
) => {
  try {
    let place = await findName(placeName);
    return await User.create({
      name: eliminarDiacriticos(name).toUpperCase(),
      lastname: eliminarDiacriticos(lastname).toUpperCase(),
      password: password,
      dni: dni,
      profile_picture: profile_picture,
      email: email,
      phone: phone,
      typeUser: typeUser,
      address: address,
      PlaceId: place.dataValues.id,
    });
  } catch (error) {
    return error;
  }
};

/**
 * find User per name
 */

let searchUser = async (name) => {
  try {
    return await User.findOne({
      where: {
        name: eliminarDiacriticos(name).toUpperCase(),
      },
    });
  } catch (error) {
    return error;
  }
};

async function findUser(id) {
  try {
    return await User.findOne({
      where: { id: id },
      include: [
        {
          model: Product,
          as: "favorite",
          through: {
            attributes: [],
          },
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
        },
      ],
      attributes: { exclude: ["password"] },
    });
  } catch (err) {
    return err;
  }
}

function eliminarDiacriticos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

module.exports = {
  createUser,
  searchUser,
  findUser,
};
