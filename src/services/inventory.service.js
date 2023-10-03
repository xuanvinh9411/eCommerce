'use strict'

const {
    inventory
} = require('../models/inventory.model')

const {
    getProductById
} = require('../models/repositories/product.repo');

const { BadRequestError } = require('../core/error.response')
class InventoryService {
    static async addStockToInventory({
        stock,
        productId,
        shopId,
        location = '123, Vườn Lài , HCM city'
    }){
        const product = await getProductById(productId)
        if(!product) BadRequestError('The Product does not exists!')

        const query = { inven_ShopId : shopId, inven_productId: productId},
        updateSet = {
            $inc:{
                invent_stock : stock
            },
            $set: {
                inven_location: location
            }
        },
        options = {upsert : true, new: true}
        return await inventory.findOneAndUpdate(query,updateSet,options)
    }
}
module.exports = InventoryService