const router = require("express").Router();
const favoritesController = require('../controllers/favoritesControllers')
const Auth = require("../middleware/Auth");

// Get all categories query name
router.get("/:id", favoritesController.createFavorites);

// Create Category
router.get("/", favoritesController.getFavorites);



module.exports = router;