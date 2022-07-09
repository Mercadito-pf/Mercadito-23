const { Router } = require('express');
const placesRouter = require('./place/place.js');
const sizesRouter = require('./size/size.js');
const userRouter = require('./user/user.js');
const categoryRouter = require("./category/category.js")
const productRouter = require('./product/product.js');

/**
 * @author Nicolas Alejandro Suarez
 * @author Andres Guerrero
 * @param {} sequelize 
 */
const router = Router();

router.use('/places', placesRouter);
router.use('/sizes', sizesRouter);
router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter)


module.exports = router;