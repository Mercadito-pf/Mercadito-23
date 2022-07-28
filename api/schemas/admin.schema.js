const mongoose = require('mongoose')

let adminSchema = mongoose.Schema({
    name:String,
    password:String
  })

const adminModel = mongoose.model("Admin", adminSchema)

module.exports = {adminModel}