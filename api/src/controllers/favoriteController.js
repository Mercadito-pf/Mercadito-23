const { User, Product } = require("../db");
const { getProduct } = require("../helpers/productHelper");

exports.obtenerFavoritos = async () => {};

exports.añadirFavorito = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findOne({
      where: { id: req.usuario.id },
    });

    if (!user) {
      return res.status(404).send({ msg: "No se encontró ningún usuario" });
    }

    let product = await Product.findOne({
      where: { id: id },
      include: "favorite",
    });

    if (!product) {
      return res.status(404).send({ msg: "No se encontró ningún producto" });
    }

    await user.addFavorite(product);

    res.json({ msg: "El producto se añadió a favoritos." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.eliminarFavorito = async () => {};
