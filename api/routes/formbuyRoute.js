const router = require("express").Router();
const FormBuyControl = require("../controllers/formbuyControls")

router.post("/",  FormBuyControl.sabeForm )
router.get("/:id", FormBuyControl.getFormBuy)

module.exports = router;