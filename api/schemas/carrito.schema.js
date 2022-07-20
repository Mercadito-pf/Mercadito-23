const mongoose = require('mongoose')

let carritoSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})

const carritoModel = mongoose.model("Carrito", carritoSchema)

module.exports = {carritoModel}