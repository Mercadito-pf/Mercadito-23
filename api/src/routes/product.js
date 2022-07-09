require("dotenv").config();
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */
/**
 * route to post a product
 */

router.post("/", productController.crearProducto);

/**
 * route to get a products
 */
router.get("/", productController.obtenerProductos);

module.exports = router;
