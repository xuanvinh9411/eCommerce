'use strict'

const { discount } = require('../models/discount.model')
const { 
    BadRequestError, 
    AuthFailureError,
        } = require('../core/error.response')
const { convertToObjectIdMongdb } = require('../utils/index')

/*
        Discount Services
        1 - Generator Discount Code [Shop | Admin]
        2 - Get discount amount [User]
        3 - Get all discount codes [User | Shop]
        4 - Verify discount code [user]
        5 - Delete discount code [Shop | Admin]
        6 - Cancel discount code [User]
 */

class DiscountService{
    static async creaeteDiscountCode( payload ){
        const { code, start_date , end_date , is_active , shopId, 
                min_order_value, product_Ids, applies_to, name , description,
                type, value, max_value, max_uses, uses_count, max_uses_per_user
            } = payload

            if(new Date() < new Date(start_date) || new Date() > new Date(end_date)){
                throw new BadRequestError('Discount code has expried!')
            }

            if(new Date(end_date) < new Date(start_date)){
                throw new BadRequestError('Start date must be before end_date')
            }

            const foundDisCount = await discount.findOne({
                discount_code : code,
                discount_shopId : convertToObjectIdMongdb(shopId)
            })

            if(foundDisCount && foundDisCount.discount_is_active){
                throw new BadRequestError('Discount Exists!')
            }

            const newDiscount = await discount.create({
                
            })    
    }
}
