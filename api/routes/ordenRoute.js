const router = require("express").Router();
const ordenControllers = require("../controllers/ordenControllers");

router.post("/",ordenControllers.crearOrden)
router.get("/getAllOrders/", ordenControllers.traerTodaslasOrdenes);
router.get("/:id",ordenControllers.getById )
router.put("/:id",ordenControllers.modificarOrden)
router.post("/getAll",ordenControllers.traerOrdenUsuario)
module.exports = router;