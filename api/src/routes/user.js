require('dotenv').config();
const express = require('express');
const router = express.Router();
const {createUser} = require('../helpers/userHelper'); 
const userController = require("../controllers/userController")

/**
 * @author Andres 
 */

/**
 * Crear un nuevo usuario
 */
router.post('/signup', userController.signUp);

/**
 *  Permitir iniciar sesión
 */
router.post('/signin', userController.signIn);

module.exports = router;