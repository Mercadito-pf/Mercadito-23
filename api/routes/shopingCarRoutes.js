const router = require("express").Router();
const shopingCarController = require('../controllers/shopingCarControllers')
const Auth = require("../middleware/Auth");

router.post("/:id", Auth, shopingCarController.agregateToCar);

router.get("/", Auth, shopingCarController.getProductsInCar);

router.delete('/:id', shopingCarController.deleteProductCar)

router.put("/:id", shopingCarController.updateShopingCar)



module.exports = router;