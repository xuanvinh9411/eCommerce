const CheckoutService = require("../services/checkout.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class CheckoutController {
    checkoutReview = async (req,res,next) =>{
        new SuccessResponse({
            message:'Checkout success',
            metadata : await CheckoutService.checkoutReview(req.body)
        }).send(res)
    }

  
}

module.exports = new CheckoutController()