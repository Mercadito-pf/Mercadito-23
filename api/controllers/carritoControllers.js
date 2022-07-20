
let { carritoModel } = require("../schemas/carrito.schema")

exports.createCarrito = async (req, res) => {

    // res.send('post a /favorites'+req.params.id)
    let { id } = req.params
    let id_user = req.usuario.id

    try {
        let carrito = new carritoModel({
            product: id,
            user: id_user
        })
        await carrito.save()
        res.status(201).send({ msg: "agregado al carrito" })
    } catch (error) {
        console.log(error)
    }

}

exports.getCarrito = async (req, res) => {
    let id = req.usuario.id

    try {
        let carrito = await carritoModel.find({ user: id })
            .populate("product user")
            .exec()

            
        res.send(carrito)
    } catch (error) {
        console.log(error)
    }

}

exports.deleteCarrito = async (req, res) => {

    try {
        const carrito = await carritoModel.findByIdAndDelete(req.params.id);
        if (!carrito) res.status(404).send("No item found");
        res.status(200).send({ msg: "deleted succesful" });
    } catch (error) {
        console.log(error)
    }

}

exports.getcarritoID = async (req, res) => {
    let id = req.params.id

    let carrito = await carritoModel.findOne({product:id})
        .populate("product user")
        .exec()
    res.send(carrito)
}
