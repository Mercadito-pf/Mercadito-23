const mongoose = require('mongoose')

let shopingCarSchema = mongoose.Schema({
    cantidad:{
        type:Number,
        default:1
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const shopingCarModel = mongoose.model("ShopingCar", shopingCarSchema)

module.exports = {shopingCarModel}