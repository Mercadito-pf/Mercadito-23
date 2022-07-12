const { User, Place, Product, Category, Size, Img } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  emailRegistroEmpleado,
  emailInfoActualizada,
  emailOlvideContrasenia,
} = require("../helpers/envioCorreos");
const { findUser } = require("../helpers/userHelper");

// Permite el registro de nuevos usuarios
exports.signUp = async (req, res) => {
  const { name, lastname, password, email } = req.body;

  try {
    let user = await User.findOne({
      where: { email },
      include: "favorite",
      attributes: { exclude: ["password"] },
    });

    // Se verifica la existencia de un email ya registrado
    if (user) {
      return res.status(401).json({ msg: "Usuario ya registrado" });
    }

    // Se realiza hash a la contrase ante de guardarse
    let passwordE = await bcrypt.hash(password, 10);

    // Se crea usuario
    let newUser = await User.create({
      ...req.body,
      password: passwordE,
    });

    // Se crea el token como paylad el id del usuario creado y como secrete se usa variable de entorno
    let token = jwt.sign({ id: newUser.id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    emailRegistroEmpleado(email, `${name} ${lastname}`);

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
      attributes: { exclude: ["password"] },
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
    const user = await findUser(req.usuario.id);

    if (!user) {
      return res.status(404).json({ msg: "No se encontro ningun usuario" });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { name, lastname, password, dni, email, phone } = req.body;

  try {
    const user = await findUser(req.usuario.id);

    if (!user) {
      return res.status(404).json({ msg: "No se encontro ningun usuario" });
    }

    if (user.dataValues.email !== email) {
      const correoExistente = await User.findOne({
        where: { email: email },
      });
      if (correoExistente) {
        return res
          .status(400)
          .send({ message: "El nuevo correo ya está registrado" });
      }
    }

    if (user.dataValues.dni !== dni) {
      const dniExistente = await User.findOne({
        where: { dni: dni },
      });
      if (dniExistente) {
        return res
          .status(400)
          .send({ message: "El nuevo DNI ya está registrado" });
      }
    }

    if (user.dataValues.phone !== phone) {
      const phoneExistente = await User.findOne({
        where: { phone: phone },
      });
      if (phoneExistente) {
        return res
          .status(400)
          .send({ message: "El nuevo número ya está registrado" });
      }
    }

    if (password) {
      return res.status(400).send({ message: "La password no es modificable" });
    }

    user.set(req.body);
    await user.save();

    emailInfoActualizada(email, `${name} ${lastname}`);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.olvideContrasenia = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(400).send({
        message:
          "No se ha enviado las instrucciones al correo electrónico proporcionado",
      });
    }

    const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET, {
      expiresIn: "5m",
    });

    //Función para enviar correo
    emailOlvideContrasenia(
      email,
      `${user.dataValues.name} ${user.dataValues.lastname}`,
      token
    );

    res.status(200).send({
      message:
        "Se ha enviado las instrucciones al correo electrónico proporcionado",
        token
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.nuevaContrasenia = async (req, res) => {
  try {
    const nuevaContrasenia = req.body.nuevaContrasenia;
    const tokenCuenta = req.params.reset;
    if (!tokenCuenta) {
      return res
        .status(400)
        .send({ message: "No se puede cambiar la contraseña" });
    }

    jwt.verify(tokenCuenta, process.env.SECR3T);

    const usuario = await User.findOne({ tokenCuenta: tokenCuenta }).exec();
    if (!usuario) {
      log.info("No se puede cambiar la contraseña");
      return res
        .status(400)
        .send({ message: "No se puede cambiar la contraseña" });
    }
    usuario.contrasenia = await bcrypt.hash(nuevaContrasenia, 10);
    await usuario.save();
    log.info("Se ha cambiado la contraseña éxitosamente");
    return res
      .status(201)
      .send({ message: "Se ha cambiado la contraseña éxitosamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

/*     Se busca id de place para ser agregada al usuario
    let placeResponse = await Place.findOne({
      where: {
        name: place.toUpperCase(),
      },
    }); */
