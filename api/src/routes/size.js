require("dotenv").config();
const express = require("express");
const router = express.Router();
const sizeController = require("../controllers/sizeController");
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */
/**
 * route to post a size
 */
router.post("/", sizeController.crearSize);

/**
 * route to get a place
 */
router.get("/", sizeController.obtenerSize);

module.exports = router;
