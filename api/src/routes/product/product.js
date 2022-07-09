require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createProduct, getAllProduct } = require('./productDao.js'); 
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
/**
 * route to post a product
 */

router.post('/', async(req, res) =>{
  const {name, description, unit_price, state, QUANTITY_STOCK, user, images, category, sizes} = req.body;
  let response = await createProduct(name, description, unit_price, state, QUANTITY_STOCK, user, images, category, sizes);
  return response
    ? res.status(200).send(response)
    : res.status(400).send({ msg: "impossible to add product" });
});

/**
 * route to get a products
 */
router.get('/', async (req, res) =>{
    let response = await getAllProduct();
    return Array.isArray(response) 
    ? res.status(200).send(response)
    : res.status(400).send({ msg: response });
});

module.exports = router;