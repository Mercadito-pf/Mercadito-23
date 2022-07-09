const { createProduct, getAllProduct } = require("../helpers/productHelper");

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

exports.obtenerProductos = async (req, res) => {
  let response = await getAllProduct();
  return Array.isArray(response)
    ? res.status(200).send(response)
    : res.status(400).send({ msg: response });
};
