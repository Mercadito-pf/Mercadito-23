const { User, Product } = require("../db");
const { getProduct } = require("../helpers/productHelper");

exports.añadirFavorito = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findOne({
      where: { id: req.usuario.id },
    });
    
     // Verifica el usuario
    if (!user) {
      return res.status(404).send({ msg: "No se encontró ningún usuario" });
    }

    let product = await getProduct(id);

    // Verifica el producto
    if (!product) {
      return res.status(404).send({ msg: "No se encontró ningún producto" });
    }

     // Revisa la existencia de el producto en favoritos
    if (await user.hasFavorite(product)) {
      return res.json({ msg: "El producto ya esta en favoritos" });
    }

    // Remueve de favoritos
    await user.addFavorite(product);

    res.json({ msg: "El producto se añadió a favoritos" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

// Elimina de favoritos 
exports.eliminarFavorito = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findOne({
      where: { id: req.usuario.id },
      include: "favorite",
    });

    // Verifica el usuario
    if (!user) {
      return res.status(404).send({ msg: "No se encontró ningún usuario" });
    }

    let product = await getProduct(id);

    // Verifica el producto
    if (!product) {
      return res.status(404).send({ msg: "No se encontró ningún producto" });
    }

    // Revisa la existencia de el producto en favoritos
    if (!(await user.hasFavorite(product))) {
      return res.json({ msg: "El producto no se encuentra en favoritos" });
    }

    // Remueve de favoritos
    await user.removeFavorite(product);

    res.json({ msg: "El producto se elimino de favoritos" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};
