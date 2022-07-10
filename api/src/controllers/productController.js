const {
  createProduct,
  getAllProduct,
  getAllProductName,
  getProduct,
} = require("../helpers/productHelper");
const { Product, Category, Img, Size } = require("../db");

exports.crearProducto = async (req, res) => {
  const {
    name,
    description,
    unit_price,
    state,
    QUANTITY_STOCK,
    user,
    images,
    category,
    sizes,
  } = req.body;
  let response = await createProduct(
    name,
    description,
    unit_price,
    state,
    QUANTITY_STOCK,
    user,
    images,
    category,
    sizes
  );
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add product" });
};

// Obtener todos los productos

exports.obtenerProductos = async (req, res) => {
  try {
    const { name } = req.query;

    let products = "";

    if (name) {
      products = await getAllProductName(name);

      if (!products) {
        res.status(404).send({ msg: "No se encontró ningún producto" });
      }

      return res.status(200).send(products);
    }

    products = await getAllProduct();

    if (!products) {
      res.status(404).send({ msg: "No se encontró ningún producto" });
    }

    res.status(200).send(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    let product = await getProduct(id);

    if (!product) {
      return res.status(404).send({ msg: "No se encontró ningún producto" });
    }

    res.status(200).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};
