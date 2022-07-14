const { User, Place, Product, Category, Size, Img } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  emailRegistroUsuario,
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

    emailRegistroUsuario(email, `${name} ${lastname}`);

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

// Permite obtener un usuario
exports.getUser = async (req, res) => {
  try {
    // Se valida la existencia del usuario
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

// Actualiza los datos del usuario validando información sensible
exports.actualizarUsuario = async (req, res) => {
  const { name, lastname, password, dni, email, phone, place } = req.body;

  try {
    // Se valida la existencia del usuario
    const user = await findUser(req.usuario.id);

    if (!user) {
      return res.status(404).json({ msg: "No se encontro ningun usuario" });
    }

    // Se valida la existencia de un email previo registrado
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

    // Se valida la existencia de un DNI previo registrado
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

    // Se valida la existencia de un número previo registrado
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

    // Se valida el intento de cambio de contraseña en ruta incorrecta
    if (password) {
      return res.status(400).send({ message: "La password no es modificable" });
    }

    // Se busca el place para poder id en usuario actualizado
    let placeResponse;

    if (place) {
      placeResponse = await Place.findOne({
        where: {
          name: place.toUpperCase(),
        },
      });
      if (!placeResponse) {
        return res.status(404).send({
          message:
            "No se encontro la existencia del lugar registrado en nuestra DB",
        });
      }
    }

    // Se actualiza los datos
    user.set({ ...req.body, PlaceId: placeResponse?.dataValues.id });
    await user.save();

    // Función para enviar email
    emailInfoActualizada(email, `${name} ${lastname}`);

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Envia email para modificar contraseña y crea token para su validez
exports.olvideContrasenia = async (req, res) => {
  try {
    const { email } = req.body;

    // Se busca la existencia del usuario
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

    // Se genera token para la vigencia para poder modificar la contraseña
    const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET, {
      expiresIn: "10m",
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
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Permite modificar la contraseña del usuario
exports.nuevaContrasenia = async (req, res) => {
  try {
    const { nuevaContrasenia } = req.body;
    const { token } = req.params;

    // Se válida la autenticidad de token
    const {id} = jwt.verify(token, process.env.SECRET);

    // Se válida la existencia del usuario
    const user = await findUser(id);

    if (!user) {
      return res
        .status(400)
        .send({ message: "No se puede cambiar la contraseña" });
    }

    // Se generra la nueva contraseña y se guarda
    let newPassword = await bcrypt.hash(nuevaContrasenia, 10);
    user.set({ password: newPassword });

    await user.save();

    emailInfoNuevacontrasenia(email,`${user.name} ${user.lastname}`)

    return res
      .status(201)
      .send({ message: "Se ha cambiado la contraseña éxitosamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};
