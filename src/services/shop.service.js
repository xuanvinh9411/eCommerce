'use strict'
const shopModel = require("../models/shop.model")

const findByEmail = async({email,select = {_id:1 , email : 1, password : 1 , name : 1, role : 1}}) => {
    return await shopModel.findOne({email}).select(select)
}

module.exports = {
    findByEmail
}