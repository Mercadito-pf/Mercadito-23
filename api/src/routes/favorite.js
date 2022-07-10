require("dotenv").config();
const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const Auth = require("../middleware/Auth");

/**
 *  @author Andres
 */

// Añadir a favoritos
router.post("/new/:id", Auth, favoriteController.añadirFavorito);

// Eliminar de favoritos
router.post("/delete/:id", Auth, favoriteController.eliminarFavorito);

module.exports = router;
