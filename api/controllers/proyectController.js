const { productModel } = require("../schemas/products.schema");

exports.createProduct = async (req, res) => {
  let product = req.body;
  product.price = Number(product.price);
  product.stock = Number(product.stock);
  console.log(product);

  try {
    const product = new productModel(product);
  await product.save();
  res.sendStatus(201);
  } catch (error) {
    console.log(error)
  }
  
};

exports.getProducts = async (req, res) => {
  const { category, sort, order, name } = req.query;
  let page = req.query.page || 0;
  let limit = req.query.limit || 16;
  let start = page * limit;

  let query = {}

    if (category) {
        query.category = category
    } else if (name) {
      
        query.name=new RegExp(`^${name}|\\s${name}`, "i")
    }

    // console.log(name)

  try {
    if (name || category) {
      let promiseLength = productModel.find(query).count().exec();
      let promiseProducts = productModel
        .find(query)
        .limit(Number(limit))
        .skip(Number(start))
        .sort(order === "asc" ? sort : order === "desc" && { [sort]: -1 })
        .exec();

      let [products, length] = await Promise.all([
        promiseProducts,
        promiseLength,
      ]);
      let totalPages = Math.ceil(length / limit);
      return res.send({ data: { totalPages }, products });
    }

    let promiseProducts = productModel
      .find()
      .limit(Number(limit))
      .skip(Number(start))
      .sort(order === "asc" ? sort : order === "desc" && { [sort]: -1 })
      .exec();
    let promiseLength = productModel.find().count().exec();

    let [products, length] = await Promise.all([
      promiseProducts,
      promiseLength,
    ]);
    let totalPages = Math.ceil(length / limit);
    res.send({ data: { totalPages }, products });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let product = await productModel.findOne({ id }).exec();
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
  let query = req.query;
  let product = await productModel.findOne(query).exec();
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
