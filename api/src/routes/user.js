require('dotenv').config();
const express = require('express');
const router = express.Router();
const {createUser} = require('../helpers/userHelper'); 
const userController = require("../controllers/userController")

/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
/**
 * route to post a user
 */
router.post('/signup', userController.crearUsuario);

/**
 * route to get a user
 */
router.get('/', async (req, res) =>{
    //crear get user
});

module.exports = router;