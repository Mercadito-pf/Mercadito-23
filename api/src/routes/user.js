require('dotenv').config();
const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const Auth = require("../middleware/Auth")

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

/**
 * Permite traer obtener el usuario 
 */
router.get("/",Auth,userController.getUser)


module.exports = router;