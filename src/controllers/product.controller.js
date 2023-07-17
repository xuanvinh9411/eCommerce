'use strict'

const ProductService = require("../services/product.service")
const ProductServiceV2 = require("../services/product.service.xxx")
const { SuccessResponse } = require('../core/success.response')

class ProductController {

    createProduct = async (req, res ,next) =>{
        // new SuccessResponse({
        //     message: 'Get token success!',
        //     metadata : await ProductService.createProduct(req.body.product_type,{
        //         ...req.body,
        //         product_shop :  req.user.userId})
        // }).send(res)

        new SuccessResponse({
            message: 'Get token success!',
            metadata : await ProductServiceV2.createProduct(req.body.product_type,{
                ...req.body,
                product_shop :  req.user.userId})
        }).send(res)
    }

    //Query //
    /**
     * @description Get all Drafts for shop
     * @param {Number} limit 
     * @param {Number} skip 
     * @return {JSON}  
     */
    getAllDraftsForShop = async(req, res, next)=>{
        new SuccessResponse({
            message: 'Get list Fraft success!',
            metadata : await ProductServiceV2.findAllDraftsForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }
    // End Query //

}

module.exports = new ProductController()