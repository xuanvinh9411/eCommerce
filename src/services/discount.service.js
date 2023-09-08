'use strict'

const Discount = require('../models/discount.model')
const { 
    BadRequestError, 
    AuthFailureError,
    NotFoundError,
        } = require('../core/error.response')
const { convertToObjectIdMongdb } = require('../utils/index')
const { findAllProduct } = require('../models/repositories/product.repo')
const CheckoutSerVice = require('./checkout.service')
const  {
            findAllDiscountCodesUnSelect,
            findAllDiscountCodesSelect,
            checkDiscountExists
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
                type, value, max_value, max_uses, uses_count, max_uses_per_user ,users_used
            } = payload
            if(new Date() < new Date(start_date) || new Date() > new Date(end_date)){
                throw new BadRequestError('Discount code has expried!')
            }

            if(new Date(end_date) < new Date(start_date)){
                throw new BadRequestError('Start date must be before end_date')
            }
            const foundDisCount = await Discount.findOne({
                discount_code : code,
                discount_shopId : convertToObjectIdMongdb(shopId)
            })

            if(foundDisCount && foundDisCount.discount_is_active){
                throw new BadRequestError('Discount Exists!')
            }

            const newDiscount = await Discount.create({
                discount_name : name,
                discount_description : description,
                discount_type : type,//fixed_amount : money . percentage : %
                discount_value : value,
                discount_code : code,
                discount_start_date : new Date(start_date),
                discount_end_date : new Date(end_date),
                discount_max_uses : max_uses,// max user uses
                discount_uses_count : uses_count, // quanlity discount uses
                discount_users_used :  users_used,
                discount_max_value :  max_value,
                discount_max_uses_per_user : max_uses_per_user, // max quanlity once user uses
                discount_min_order_value : min_order_value ,
                discount_shopId : shopId,
                discount_is_active: is_active,
                discount_applies_to : applies_to,
                discount_product_ids: applies_to === 'all' ? [] : product_Ids
            })    

            return newDiscount;

    }

    static async updateDiscountCode(payload){

    }

    static async getAllDiscountCodesWithProduct({
        code ,shopId,limit,page
    }){
        const foundDisCount = await Discount.findOne({
            discount_code : code,
            discount_shopId : convertToObjectIdMongdb(shopId)
        }).lean()
        if(!foundDisCount || !foundDisCount.discount_is_active){
            throw new BadRequestError('Disount not exists !')
        }

        const { discount_applies_to , discount_product_ids} = foundDisCount
        console.log( {foundDisCount})
        let products;
        if(discount_applies_to === 'all'){
            products = await findAllProduct({filter : {
                product_shop : convertToObjectIdMongdb(shopId),
                isPushlished : true,
                limit : +limit,
                page : +page,
                sort : 'ctime',
                select : ['product_name']
            }})
        }

        if(discount_applies_to === 'specific'){
             products = await findAllProduct({filter : {
             _id : {$in : discount_product_ids},
                isPushlished : true },
                limit : +limit,
                page : +page,
                sort : 'ctime',
                select : ['product_name']
            })
        }
        return products
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
            model : Discount 
        })
        return discounts
    }

    static async getDiscountAmount({codeId,userId,shopId,products}){
        const foundDisCount = await checkDiscountExists({
            model : Discount ,
            filter : {
                discount_code : codeId,
                discount_shopId : convertToObjectIdMongdb(shopId),
            }
        })
        if(!foundDisCount) throw new NotFoundError(`discount doesn't exitst`)

        const { discount_is_active , 
                discount_max_uses,
                discount_min_order_value,
                discount_max_uses_per_user,
                discount_start_date,
                discount_end_date,
                discount_users_used,
                discount_type,
                discount_value
             } = foundDisCount

        if(!discount_is_active) throw new new NotFoundError(`discount expried`)
        if(!discount_max_uses) throw new new NotFoundError(`discount are out`)

        if(new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)){
            throw new new NotFoundError(`discount ecode has expried`)
        }

        let totalOrder = 0 ;
            totalOrder = products.reduce((acc,product) =>{
                return acc + (product.quantity * product.price)
            },0)
        if(discount_min_order_value > 0) {
            if(totalOrder < discount_min_order_value){
                throw new NotFoundError(`discount requires a minium oder value of ${discount_min_order_value}`)
            }
        }

        //
        if(discount_max_uses_per_user > 0){
            const userUseDiscount = discount_users_used.find(user => user.userId === userId);
            if(userUseDiscount) throw new NotFoundError(`User has use discount`)
        }

        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value/100)

        return {totalOrder,
                discount : amount,
                totalPrice : totalOrder - amount    
            }
    }

    // delete discount có nhiều phương thức 
    // gán key xóa , Bk data khác 
    static async deleteDiscountCode({shopId, codeId}){
        return await Discount.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: convertToObjectIdMongdb(shopId)
        })
    }

    static async cancelDisCountCode({codeId, shopId, userId}){
        const foundDisCount = await checkDiscountExists({
            model : Discount,
            filter : {
                discount_shopId : convertToObjectIdMongdb(shopId),
                discount_code : codeId
            }
        })

        if(!foundDisCount){
            throw new NotFoundError(`Not Found discount code`)
        }
        
        const result = await Discount.findByIdAndUpdate(foundDisCount._id,{
            $pull: {
                discount_users_used : userId,

            },$inc:{
                discount_max_uses : 1,
                discount_uses_count: -1
            }
        })
    }

    static async orderByUser({
        shop_order_ids,
        cartId,
        userId,
        user_address = {},
        user_payment = {}
    }){
        const { shop_order_ids_new , checkout_oder } = await CheckoutSerVice.checkoutReview({
            cartId,
            userId,
            shop_order_ids
        })
        //check review product exists
        const products = shop_order_ids_new.flatMap( order => order.item_products)
        for (let i=0;i<products.length ;++i ){
            const {productId, quantity} = products[i]
        }
    }
}

module.exports = DiscountService;
