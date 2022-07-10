const { createCategory, findCategories } = require("../helpers/categoryHelper");

// Permite crear categoria
exports.crearCategoria = async (req, res) => {
  const { name } = req.body;
  let response = await createCategory(name);
  if (!response) {
    res.status(400).send({ msg: "impossible to add category" });
  }
  res.status(200).send(response);
};

// Obtiene todas las categorias
exports.obtenerCategorias = async (req, res) => {
  try {
    let response = await findCategories();
    if (!response) {
      res.status(400).send({ msg: response });
    }
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Algo ha ocurrido" });
  }
};
