'use strict'

const cart = require("../models/cart.model");
const { Types } = require('mongoose');
const { getProductById } = require("../models/repositories/product.repo");
const { 
    BadRequestError, 
    NotFoundError,
        } = require('../core/error.response')
class CartService {
    static createUserCar = async({userId,product}) =>{
        try {
            const query = {cart_userId : userId,cart_state: 'active'}, 
                  updateOrInsert = { 
                    $addToSet:{
                        cart_product: product
                    }
                   },
                  options = { upsert : true , new : true}
                  return await cart.findOneAndUpdate(query, updateOrInsert, ); 
        } catch (error) {
            return error;
        }
    }

    static updateUserCartQuantity = async ({userId,product}) =>{
        const {producId ,quantity} = product
        const query = {
            cart_userId : userId,
            'cart_product.productId': producId,
            cart_state : 'active'
        }
        updateSet = {
            $inc:{
                'cart_product.$.quantity': quantity
            }
        }
        options = { upsert : true , new : true}
        return await cart.findOneAndUpdate(query,updateSet,options)
    }

    static addToCart = async ({userId,product={}})=>{

        const userCart = await cart.findOne({cart_userId:userId})
        if(!userCart){
            return await CartService.createUserCar({userId,product})
        }

        if(!userCart.cart_products.length){
            userCart.userCart = [product]
            return await userCart.save()
        }
        return await CartService.updateUserCartQuantity({userId,product})
    }

    static addToCartV2 = async ({shop_oder_ids})=>{

        const {productId,quantity,old_quantity} = shop_oder_ids[0]?.item_porduct[0]

        const foundProduct = await getProductById(productId)
        if(!foundProduct)throw new NotFoundError('Not Found Product')
            
        if(foundProduct.product_shop.toString()!== shop_oder_ids[0]?.shopId){
            throw new NotFoundError('Product do not belong to the shop')
        }
        
        if(quantity === 0){
            //delete
        }
        return await CartService.updateUserCartQuantity({
            userId,
            product : {
                productId,
                quantity : quantity - old_quantity
            }
        })

    }

   
    static deleteUserCart = async ({userId,product}) =>{
        const {producId} = product
        const query = {
            cart_userId : userId,
            'cart_product.productId': producId,
            cart_state : 'active'
        }
        updateSet = {
            $pull:{
                cart_product: {producId}
            }
        }
        options = { upsert : true , new : true}
        return await cart.updateOne(query,updateSet)
    }

    static async getListUserCart({userId}){
        return cart.findOne({
            cart_userId : userId
        }).lean()
    }
}

module.exports = CartService