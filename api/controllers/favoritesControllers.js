const { productModel } = require('../schemas/products.schema')
const { favoritesModel } = require('../schemas/favorites.schema')

exports.createFavorites = async (req, res) => {
    let { id } = req.params
    let { user } = req.query

    console.log(id, user)
    try {
        let product = await productModel.findOne({ id }).exec()
        delete product._id
        const productCreated = new favoritesModel({ product, user });
        await productCreated.save();
        res.sendStatus(201)
    } catch (error) {

    }

    // res.send("get a /favorites/"+req.params.id+" "+req.query.user)

}

exports.getFavorites = async (req, res) => {
   let {user}=req.query

   try {
    let favorites = await favoritesModel.find({user}).exec()
    // let favoriteMap = favorites.map(favorite => {
    //     return {...favorite.product}
    // })

    // console.log(favoriteMap)
   res.send(favorites)
   } catch (error) {
    console.log(error)
   }
   
}


