require('dotenv').config();
const express = require('express');
const router = express.Router();
const {createUser} = require('../helpers/userHelper'); 
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
/**
 * route to post a user
 */
router.post('/', async(req, res) =>{
   const {name, lastname, password, dni, profile_picture, email, phone, typeUser, address, place} = req.body;
   let response = await createUser(name, lastname, password, dni, profile_picture, email, phone, typeUser, address, place);
   return response? res.status(200).send(response)
   : res.status(400).send({ msg: "impossible to add user" });
});

/**
 * route to get a user
 */
router.get('/', async (req, res) =>{
    //crear get user
});

module.exports = router;