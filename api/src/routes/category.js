require("dotenv").config();
const express = require("express");
const router = express.Router();
const { createCategory, findCategories } = require("../helpers/categoryHelper");
/**
 *  @author Andres
 */
router.post("/", async (req, res) => {
  const { name } = req.body;
  let response = await createCategory(name);
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add category" });
});

router.get("/", async (req, res) => {
  let response = await findCategories();
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: response });
});

module.exports = router;
