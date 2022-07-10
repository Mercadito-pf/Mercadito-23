const { User, Place } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Permite el registro de nuevos usuarios
exports.signUp = async (req, res) => {
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
  let token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
    expiresIn: "7d",
  });

  res.json({
    user: newUser,
    token,
  });
};

// Permite la autenticación de usuarios
exports.signIn = async(req,res)=>{
  const { email, password } = req.body;

  // verificar de la existencia del usuario
  let userLogin = await User.findOne({
    where: {email},
  });

  if (!userLogin) {
    res.status(404).json({ msg: "Credenciales inválidas" });
  }

  // verificar la contraseña
  if (await bcrypt.compare(password, userLogin.password)) {
     // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
    let token = jwt.sign({ id:userLogin.id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    res.json({ user: userLogin, token });
  } else {
    res.status(404).json({ msg: "Credenciales inválidas" });
  }
}

exports.getUser = (req,res)=>{
  console.log("aqui")  
}
