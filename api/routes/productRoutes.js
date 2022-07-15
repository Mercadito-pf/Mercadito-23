const router = require("express").Router();
const proyectController = require("../controllers/proyectController");
const Auth = require("../middleware/Auth");

// Get all products
router.get("/", proyectController.getProducts);

// Create Product
router.post("/", proyectController.createProduct);

// Get one product
router.get("/:id", proyectController.getProduct);

// Get Features
router.get("/features", proyectController.getFeatures);

module.exports = router;
