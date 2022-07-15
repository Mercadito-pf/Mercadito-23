const { productModel } = require("../schemas/products.schema");

exports.createProduct = async (req, res) => {
  let product = req.body;
  product.price = Number(product.price);
  product.stock = Number(product.stock);
  console.log(product);
  const p = new productModel(product);
  await p.save();
  res.sendStatus(201);
};

exports.getProducts = async (req, res) => {
  const { category, sort, order } = req.query;
  let page = req.query.page || 0;
  let limit = req.query.limit || 16;
  let start = page * limit;

  try {
    if (category) {
      let promiseLength = productModel.find({ category }).count().exec();
      let promiseProducts = productModel
        .find({ category })
        .limit(Number(limit))
        .skip(Number(start))
        .sort(order === "asc" ? sort : order === "desc" && { [sort]: -1 })
        .exec();

      let [products, length] = await Promise.all([
        promiseProducts,
        promiseLength,
      ]);
      let totalPages = Math.floor(length / limit);
      return res.send({ data: { totalPages }, products });
    }

    let promiseProducts = productModel
      .find()
      .limit(Number(limit))
      .skip(Number(start))
      .sort({ date: -1 })
      .exec();
    let promiseLength = productModel.find().count().exec();

    let [products, length] = await Promise.all([
      promiseProducts,
      promiseLength,
    ]);
    let totalPages = Math.floor(length / limit);
    res.send({ data: { totalPages }, products });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let product = await productModel.findOne({ _id: id }).exec();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
};

let arr = [
  "name",
  "price",
  "stock",
  "description",
  "image",
  "almacenamiento",
  "ram",
  "marca",
  "modelo",
  "bateria",
  "frecuencia",
  "resolucion",
  "duracion_bateria",
  "potencia",
  "litros",
  "RPM",
  "capacidad_de_lavado",
  "tipo",
];

exports.getFeatures = async (req, res) => {
  let q = req.query;
  let product = await productModel.findOne(q).exec();
  let features = [];
  for (const key in product) {
    if (arr.includes(key)) {
      features.push(key);
    }

    // console.log(key)
  }

  console.log(features);

  res.send(product);
};
