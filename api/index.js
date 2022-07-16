const express = require('express')
const mongoose = require('mongoose')
let cors = require('cors')

require('dotenv').config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/categories", require("./routes/categoryRoutes"));
app.use('/features', require("./routes/featuresRoutes"))

// Route Deploy
app.get("/", function (req, res) {
  res.json({ msg: "Servidor funcionando" });
});

// Server
app.listen(3001, async () => {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log('listening at port 3001')
})