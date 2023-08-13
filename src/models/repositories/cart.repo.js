'use strict'

const { unGetselectData, getselectData , convertToObjectIdMongdb } = require('../../utils/index')
const Cart  = require('../cart.model')

const findCartById = async(cartId) =>{
    return await Cart.findOne({_id: convertToObjectIdMongdb(cartId),cart_state:'active'}).lean()
}



module.exports = {
    findCartById,
}