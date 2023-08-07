'use strict'

const DiscountService = require("../services/discount.service")
const { SuccessResponse } = require('../core/success.response')

class DiscountController {

    createProduct = async (req, res ,next) =>{
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata : await DiscountService.creaeteDiscountCode({
                ...req.body,
                shopId  :  req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodes = async(req, res, next) =>{ 
        new SuccessResponse({
            message: 'Successful Code Found!',
            metadata : await DiscountService.getAllDiscountCodesByShop({
                ...req.query,
                shopId  :  req.user.userId
            })
        }).send(res)
     }

     getDiscountAmount = async(req, res, next) =>{ 
        new SuccessResponse({
            message: 'Successful Code Found!',
            metadata : await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send(res)
     }

     getAllDiscountCodesWithProducts = async(req, res, next) =>{ 
        new SuccessResponse({
            message: 'Successful Code Found!',
            metadata : await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query
            })
        }).send(res)
     }

}

module.exports = new DiscountController()