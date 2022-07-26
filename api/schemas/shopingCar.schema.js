const mongoose = require('mongoose')

let shopingCarSchema = mongoose.Schema({
    products: [{
        name:String, 
        cantidad:{
            type:Number,
            default:1
        },
        stock:Number,
        price:Number
    }],
    user: { 
        nombre:String,
        apellido:String,
        direccion:String,
        codigoPostal:String,
        ciudad:String,
        pais:String,
        telefono:String
    }
})

const shopingCarModel = mongoose.model("ShopingCar", shopingCarSchema)

module.exports = {shopingCarModel}