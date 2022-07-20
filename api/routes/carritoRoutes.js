const router = require("express").Router();
const carritoController = require('../controllers/carritoControllers')
const Auth = require("../middleware/Auth");

router.post("/:id", Auth, carritoController.createCarrito);

router.get("/", Auth, carritoController.getCarrito);

router.delete('/:id', carritoController.deleteCarrito)

router.get("/:id", carritoController.getcarritoID)



module.exports = router;