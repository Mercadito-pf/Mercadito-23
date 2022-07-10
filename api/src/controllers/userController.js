const { User, Place } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Permite el registro de nuevos usuarios
exports.crearUsuario = async (req, res) => {
  const {
    name,
    lastname,
    password,
    dni,
    profile_picture,
    email,
    phone,
    address,
    typeUser,
    place,
  } = req.body;

  let user = await User.findOne({where:{email}})

  // Se verifica la existencia de un email ya registrado
  if(user){
    return res.status(401).json({msg:"Usuario ya registrado"})
  }

  // Se busca id de place para ser agregada al usuario
  let placeResponse = await Place.findOne({
    where: {
      name: place.toUpperCase(),
    },
  });

  // Se realiza hash a la contrase ante de guardarse
  let passwordE = await bcrypt.hash(password, 10);

  // Se crea usuario
  let newUser = await User.create({
    ...req.body,
    password: passwordE,
    PlaceId: placeResponse.dataValues.id,
  });

  // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
  let token = jwt.sign({ id: newUser.id }, process.env.SECRETE, {
    expiresIn: "7d",
  });

  res.json({
    user: newUser,
    token,
  });
};


