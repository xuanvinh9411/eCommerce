'use strict'
const { orderBy } = require('lodash')
const { BadRequestError } = require('../core/error.response')
const { product } = require('../models/product.model')
const { findCartById }  = require('../models/repositories/cart.repo')
const { checkProductByServer }  = require('../models/repositories/product.repo')
const { getDiscountAmount } = require('./discount.service')
const { acquireLock,releaseLock } = require('./redis.service')
const { order } = require('../models/order.model')
class CheckoutService {
    /**
     * {
     *      cartId,
     *      userId,
     *      shop_order_ids:[
     *         {
     *              shopId,
     *              shop_discount: [],
     *              item_products : [
     *                      {
     *                          price,
     *                          quantity,
     *                          productId,
     *                      }
     *              ]
     *         },
     *         {
     *              shopId,
     *              shop_discount: [
     *                   "shopId",
     *                   "discountId",
     *                   "codeId",
     *              ],
     *              item_products : [
     *                      {
     *                          price,
     *                          quantity,
     *                          productId,
     *                      }
     *              ]
     *         }
     *      ]
     * }
     */
    static async checkoutReview({
        cartId, userId, shop_order_ids
    }){
        //check cartId exists
        const foundCart = await findCartById(cartId)
        if(!foundCart) throw new BadRequestError('Cart does not exists!');

        const checkout_order = {
            totalPrice: 0, // tong tien hang
            freeShip : 0, // phi ship
            totalDiscount : 0, // tong tien discount
            totalCheckout: 0, //tong thanh toan
        }, shop_order_ids_new = []

        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shopId , shop_discounts = [], item_products = []} = shop_order_ids[i]
            
            const checkProductServer = await checkProductByServer(item_products)
            if(!checkProductServer[0]) throw new BadRequestError('order wrong!!!')

            if(item_products.quantity > checkProductServer.quantity )throw new BadRequestError('order wrong!!!')
            const checkoutPrice = checkProductServer.reduce((acc,product) =>{
                return acc + (product.quantity * product.price)
            },0)

            //tổng tiền hàng
            checkout_order.totalPrice += checkoutPrice
            const itemCheckout = {
                shopId,
                shop_discounts,
                priceRaw: checkoutPrice,
                priceApplyDiscount: checkoutPrice,
                item_products : checkProductServer
            }
            
            // nếu discount > 0 check hợp lệ
            if( shop_discounts.length >0 ){
                // get discount
                const { totalPrice = 0 , discount = 0 } = await getDiscountAmount({
                    codeId : shop_discounts[0].code,
                    userId,
                    shopId,
                    products: checkProductServer
                })
                checkout_order.totalDiscount += discount
                if(discount > 0){
                    itemCheckout.priceApplyDiscount = checkoutPrice - discount
                }
            }
            checkout_order.totalCheckout += itemCheckout.priceApplyDiscount

            shop_order_ids_new.push(itemCheckout)

        }  
        return {
            shop_order_ids,
            shop_order_ids_new,
            checkout_order
        } 
    }

    static async orderByUser({
        shop_order_ids,
        cartId,
        userId,
        userId,
        user_address = {},
        user_payment = {}
    }){
        const { shop_order_ids_new , checkout_order} = await CheckoutService.checkoutReview({
            cartId,
            userId,
            shop_order_ids
        })

        /// check lại tồn kho
        // get new array Products
        const products = shop_order_ids_new.flatMap(order => order.item_products);
        console.log(`products :::`,products)
        const acquireProduct = []
        for (let i = 0; products < array.length; i++) {
            const { productId , quantity } = products[i]
            const keyLock = await acquireLock(productId,quantity,cartId)
            acquireProduct.push(keyLock ? true  : false)
            if(keyLock){
                await releaseLock(keyLock)
            }
        }
        //neu co mot sản phẩm hết hạn trong kho
        if(acquireProduct.includes(false)){
            throw new BadRequestError('update quantity product')
        }

        const newOrder = await order.create({
            order_userId : userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products : shop_order_ids_new
        }) 
        // trường hợp insert thành công thì remove trong cart 
        if(newOrder){
            // remove car 
        }
        return newOrder
    }
}


module.exports = CheckoutService