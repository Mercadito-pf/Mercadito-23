require("dotenv").config()
const request=require("request")
const {shopingCarModel} = require("../schemas/shopingCar.schema");
const {calc} = require("../funciones/Calc.js");

let {CLIENT_PAYPAL, SECRET_PAYPAL}= process.env
const auth = { user: CLIENT_PAYPAL, pass: SECRET_PAYPAL }


exports.createPayment = async (req, res) => {
    
    const calcular = await shopingCarModel.findById(req.params.id)    
    const total = calc(calcular.products)
    console.log(total)
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: total.totalPrice
            }
        }],
        application_context: {
            brand_name: `Mercadito`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:3001/paypal/execute-payment`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3000/cancel-payment` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
    // res.send("post a paypal")
}

exports.executePayment = (req, res) => {
    const token = req.query.token; //<-----------

    request.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, (err, response) => {
        res.json({ data: response.body })
    })
}