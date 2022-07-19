const router = require("express").Router();
const proyectController = require("../controllers/proyectController");
const Auth = require("../middleware/Auth");

// Get all products
router.get("/", proyectController.getProducts);

// Create Product
router.post("/", Auth, proyectController.createProduct);

// Get one product
router.get("/:id", proyectController.getProduct);



module.exports = router;
