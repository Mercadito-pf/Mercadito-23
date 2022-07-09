require('dotenv').config();
const express = require('express');
const router = express.Router();
const {createSize, findName } = require('./sizeDao.js'); //class with supporting methods
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
/**
 * route to post a size
 */
router.post('/', async(req, res) =>{
    const {size} = req.query
    let response = await  createSize(size);
    return response?res.status(200).send(response): res.status(400).send({msg: 'impossible to add size'});
});

/**
 * route to get a place
 */
router.get('/', async (req, res) =>{
    let { size } = req.query;
    console.log(size)
    let find = await findName(size);
    return find?res.status(200).send(find):res.status(404).send({msg: 'Not found'});
});

module.exports = router;