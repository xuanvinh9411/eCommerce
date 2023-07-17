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
            message: 'Create new Product success!',
            metadata : await ProductServiceV2.publishProductByShop({
                product_id : req.params.id,
                product_shop : req.user.userId
            })
        }).send(res)
    }

    publishProductByShop = async(req, res, next) =>{
        new SuccessResponse({
            message: 'Create new Product success!',
            metadata : await ProductServiceV2.publishProductByShop(req.body.product_type,{
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


    getAllPublishForShop = async(req, res, next)=>{
        new SuccessResponse({
            message: 'Get list publish success!',
            metadata : await ProductServiceV2.findAllPublishForShop({
                product_shop : req.user.userId
            })
        }).send(res)
    }

}

module.exports = new ProductController()