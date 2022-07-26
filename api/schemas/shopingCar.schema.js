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
    }]
})

const shopingCarModel = mongoose.model("ShopingCar", shopingCarSchema)

module.exports = {shopingCarModel}