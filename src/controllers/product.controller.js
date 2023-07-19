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
            metadata : await ProductServiceV2.createProduct(req.body.product_type,{
                ...req.body,
                product_shop :  req.user.userId})
        }).send(res)
    }

    updateProduct = async(req, res, next) =>{ 
        new SuccessResponse({
            message: 'Update Product success!',
            metadata : await ProductServiceV2.updateProduct(req.body.product_type,req.params.product_id,{
                ...req.body,
                product_shop :  req.user.userId
            })
        }).send(res)
     }

    publishProductByShop = async(req, res, next) =>{
        new SuccessResponse({
            message: 'Publish Product success!',
            metadata : await ProductServiceV2.publishProductByShop({
                product_id : req.params.id,
                product_shop : req.user.userId
            })
        }).send(res)
    }

    unPublishProductByShop = async(req, res, next) =>{
        new SuccessResponse({
            message: 'UnPublish Product success!',
            metadata : await ProductServiceV2.unPublishProductByShop({
                product_id : req.params.id,
                product_shop : req.user.userId
            })
        }).send(res)
    }

    getListSearchProduct = async(req, res, next) =>{
        new SuccessResponse({
            message: 'Get List Search Product success!',
            metadata : await ProductServiceV2.searchProducts(req.params)
        }).send(res)
    }

    findAllProducts = async(req, res, next) =>{
        new SuccessResponse({
            message: 'Get List findAllProducts success!',
            metadata : await ProductServiceV2.findAllProduct(req.query)
        }).send(res)
    }

    findProducts = async(req, res, next) =>{
        new SuccessResponse({
            message: 'Get List findProducts success!',
            metadata : await ProductServiceV2.findProduct({
                product_id : req.params.product_id
            })
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