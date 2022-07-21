function calc(car){
    let info
    if (car.length >1) {
        info = car.reduce((prev, cur) => {
            
            return {
                subTotal:(prev.cantidad * prev.product.price)+(cur.cantidad * cur.product.price),
                totalProducts:prev.cantidad+cur.cantidad
            }
        })
        info.impuestos = Number((0.15*info.subTotal).toFixed(2))
        info.totalPrice = info.impuestos+info.subTotal
    } else{
        info = {
            subTotal:(car[0].cantidad * car[0].product.price),
            totalProducts:car[0].cantidad
        }
        info.impuestos = Number((0.15*info.subTotal).toFixed(2))
        info.totalPrice = info.impuestos+info.subTotal

    }
    
    return info


    
}


module.exports = {
    calc
}