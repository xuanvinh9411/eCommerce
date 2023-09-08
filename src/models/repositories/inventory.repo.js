'use strict'

const inventory = require('../inventory.model')
const { convertToObjectIdMongdb } = require('../../utils/index')
const insertInvetory = async({
    productId, shopId , stock , location = 'unKnow'
}) =>{
        await inventory.create({
            inven_productId : productId,
            inven_stock : stock,
            inven_shopId : shopId,
            inven_location : location,
        })
}

const reservationInventory = async ({productId,quantity,cartId}) =>{
    const query = {
        inven_productId : convertToObjectIdMongdb(productId),
        invent_stock : {$gte : quantity}
    } , updateSet = {
        $inc : {
            inven_stock : -quantity
        },
        $push: {
            inven_reservations: {
                quantity,
                cartId,
            }
        }
    }, options = {upsert: true , new: true}

    return await inventory.findOne(query,updateSet,options);

}
module.exports = {
    insertInvetory,
    reservationInventory
}