require('dotenv').config();
const express = require('express');
const router = express.Router();
const { createPlace, findName } = require('../helpers/placeHelper'); //class with supporting methods
/**
 * @author Nicolas Alejandro Suarez
 * @param {} sequelize 
 */
/**
 * route to post a place
 */
router.post('/', async(req, res) =>{
    const {name, located} = req.body
    let response = await  createPlace(name, located);
    return response?res.status(200).send(response): res.status(400).send({msg: 'impossible to add place'});
});
/**
 * route to get a place
 */
router.get('/', async (req, res) =>{
    let { name } = req.query;
    let find = await findName(name);
    return find?res.status(200).send(find):res.status(404).send({msg: 'Not found'});
});

module.exports = router;