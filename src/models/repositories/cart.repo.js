'use strict'

const { unGetselectData, getselectData , convertToObjectIdMongdb } = require('../../utils/index')
const { cart } = require('../cart.model')

const findCartById = async(cartId) =>{
   return await cart.findOne({_id: convertToObjectIdMongdb(cartId),cart_state:'active'}).lean()
}



module.exports = {
    findCartById,
}