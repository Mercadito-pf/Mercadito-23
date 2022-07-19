const router = require("express").Router();
const favoritesController = require('../controllers/favoritesControllers')
const Auth = require("../middleware/Auth");

router.post("/:id", Auth, favoritesController.createFavorites);

router.get("/", Auth, favoritesController.getFavorites);

router.delete('/:id', favoritesController.deleteFavorites)



module.exports = router;