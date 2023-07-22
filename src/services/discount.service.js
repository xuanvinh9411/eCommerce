'use strict'

const { discount } = require('../models/discount.model')
const { 
    BadRequestError, 
    AuthFailureError,
        } = require('../core/error.response')
const { convertToObjectIdMongdb } = require('../utils/index')
const { 
        findAllProduct ,
        } = require('../models/repositories/product.repo')
const  {
            findAllDiscountCodesUnSelect,
            findAllDiscountCodesSelect
        } = require('../models/repositories/discount.repo')
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
                discount_Name : name,
                discount_description : description,
                discount_type : type,//fixed_amount : money . percentage : %
                discount_value : value,
                discount_code : code,
                discount_start_date : new Date(start_date),
                discount_end_date : new Date(end_date),
                discount_max_uses : max_uses,// max user uses
                discount_uses_count : uses_count, // quanlity discount uses
                discount_users_used :  users_used,
                discount_max_uses_per_user : ax_uses_per_user, // max quanlity once user uses
                discount_min_oder_value : min_oder_value ,
                discount_shopId : shopId,
                discount_is_active: is_active,
                discount_applies_to : applies_to,
                discount_product_ids: applies_to === 'all' ? [] : product_ids
            })    

            return newDiscount;

    }

    static async updateDiscountCode(payload){

    }

    static async getAllDiscountCodesWithProduct({
        code ,shopId,userId,limit,page
    }){
        const foundDisCount = await discount.findOne({
            discount_code : code,
            discount_shopId : convertToObjectIdMongdb(shopId)
        }).lean()

        if(!foundDisCount && foundDisCount.discount_is_active){
            throw new BadRequestError('Disount not exists !')
        }

        const { discount_applies_to , discount_product_ids} = foundDisCount
        let products;
        if(discount_applies_to === 'all'){
            products = await findAllProduct({filter : {
                product_shop : convertToObjectIdMongdb(shopId),
                isPushlished : true,
                limit : +limit,
                page : +page,
                sort : 'ctime',
                select : ['product_name']
            }}).lean()
        }

        if(discount_applies_to === 'specific'){
             products = await findAllProduct({filter : {
             _id : {$in : discount_product_ids},
                isPushlished : true,
                limit : +limit,
                page : +page,
                sort : 'ctime',
                select : ['product_name']
            }}).lean()
        }
    }

    static async getAllDiscountCodesByShop({
        limit,page, shopId
    }){
        const discounts = await findAllDiscountCodesUnSelect({
            limit : +limit ,
            page : +page,
            filter : {
                discount_shopId : convertToObjectIdMongdb(shopId),
                discount_is_active : true
            },
            unSelect : ['__v','discount_shopId'],
            model : discount 
        })
        return discounts
    }
}
