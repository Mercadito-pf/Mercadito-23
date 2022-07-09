require("dotenv").config();
const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize
 */
/**
 * route to post a place
 */
router.post("/", placeController.crearPlace);
/**
 * route to get a place
 */
router.get("/", placeController.obtenerplace);

module.exports = router;
