require("dotenv").config();
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

/**
 *  @author Andres
 */
router.post("/", categoryController.crearCategoria);

router.get("/", categoryController.obtenerCategorias);

module.exports = router;
