'use strict'

const cart = require("../models/cart.model");
const { Types } = require('mongoose')
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
                  return await cart.findOneAndUpdate(query, updateOrInsert, options); 
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

}

module.exports = CartService