const mongoose = require('mongoose')
const {productSchema} = require('./products.schema')

const favoritesSchema = mongoose.Schema({
    user:String,
    product:{
        type:productSchema,
        default:{},
        _id:false
    }
})

let favoritesModel = mongoose.model('Favorites', favoritesSchema)

module.exports = {
    favoritesModel
}