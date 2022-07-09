const { createPlace, findName } = require("../helpers/placeHelper");

exports.crearPlace = async (req, res) => {
  const { name, located } = req.body;
  let response = await createPlace(name, located);
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add place" });
};

exports.obtenerplace = async (req, res) => {
  let { name } = req.query;
  let find = await findName(name);
  return find
    ? res.status(200).send(find)
    : res.status(404).send({ msg: "Not found" });
};
