const { createUser } = require("../helpers/userHelper");

exports.crearUsuario = async (req, res) => {
  const {
    name,
    lastname,
    password,
    dni,
    profile_picture,
    email,
    phone,
    typeUser,
    address,
    place,
  } = req.body;
  let response = await createUser(
    name,
    lastname,
    password,
    dni,
    profile_picture,
    email,
    phone,
    typeUser,
    address,
    place
  );
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add user" });
};
