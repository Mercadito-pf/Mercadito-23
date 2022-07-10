const { User, Place, Product, Category, Size, Img } = require("../db");
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

  try {
    let user = await User.findOne({ where: { email }, include: "favorite" });

    // Se verifica la existencia de un email ya registrado
    if (user) {
      return res.status(401).json({ msg: "Usuario ya registrado" });
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
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Permite la autenticación de usuarios
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    // verificar de la existencia del usuario
    let userLogin = await User.findOne({
      where: { email },
      include: "favorite",
    });

    if (!userLogin) {
      return res.status(404).json({ msg: "Credenciales inválidas" });
    }

    // verificar la contraseña
    if (await bcrypt.compare(password, userLogin.password)) {
      // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
      let token = jwt.sign({ id: userLogin.id }, process.env.SECRET, {
        expiresIn: "7d",
      });
      return res.json({ user: userLogin, token });
    } else {
      return res.status(404).json({ msg: "Credenciales inválidas" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.usuario.id },
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
    });
    console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};
