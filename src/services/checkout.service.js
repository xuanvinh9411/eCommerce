'use strict'
const { BadRequestError } = require('../core/error.response')
const { product } = require('../models/product.model')
const { findCartById }  = require('../models/repositories/cart.repo')
const { checkProductByServer }  = require('../models/repositories/product.repo')
const { getDiscountAmount } = require('./discount.service')

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
}
module.exports = CheckoutService