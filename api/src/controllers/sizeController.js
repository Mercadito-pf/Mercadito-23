const { createSize, findName } = require("../helpers/sizeHelper");

exports.crearSize = async (req, res) => {
  const { size } = req.query;
  let response = await createSize(size);
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add size" });
};

exports.obtenerSize = async (req, res) => {
  let { size } = req.query;
  console.log(size);
  let find = await findName(size);
  return find
    ? res.status(200).send(find)
    : res.status(404).send({ msg: "Not found" });
};
