
const { default: mongoose, Model } = require("mongoose")
const { calc } = require("../funciones/Calc")
let { shopingCarModel } = require("../schemas/shopingCar.schema")

exports.agregateToCar = async (req, res) => {

    // res.send('post a /shoping'+req.params.id)
    let { id } = req.params
    let id_user = req.usuario.id

    try {
        let shoping = new shopingCarModel({
            product: id,
            user: id_user
        })
        await shoping.save()
        res.status(201).send({ msg: "create succesfull" })
    } catch (error) {
        console.log(error)
    }

}

exports.getProductsInCar = async (req, res) => {
    let id = req.usuario.id

    try {
        let cartProducts = await shopingCarModel.find({ user: id })
            .populate("product")
            .exec()

        if (cartProducts.length) {
            let info = calc(cartProducts)
        return res.send({cart:cartProducts, calc:info})
        }
        res.send({})
        
    } catch (error) {
        console.log(error)
    }

}

exports.deleteProductCar = async (req, res) => {

    try {
        const shoping = await shopingCarModel.findByIdAndDelete(req.params.id);
        if (!shoping) res.status(404).send("No item found");
        res.status(200).send({ msg: "deleted succesful" });
    } catch (error) {
        console.log(error)
    }
}

exports.updateShopingCar = async (req, res) =>{


   let updated = await shopingCarModel.findOneAndUpdate({_id:req.params.id}, {
    $set:{
        cantidad:req.body.cantidad
    }
   })

   res.send(updated)
}


// exports.getProductCarID = async (req, res) => {
//     let id = req.params.id

//     let favorite = await favoritesModel.findOne({product:id})
//         .populate("product user")
//         .exec()
//     res.send(favorite)
// }


