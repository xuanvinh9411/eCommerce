'use strict'

const {product,electronic} = require('../product.model')
const { Types } = require('mongoose') 
const { getselectData ,unGetselectData } = require('../../utils/index')

const findAllDraftsForShop = async({query,limit,skip}) =>{
    return await queryProduct({query,limit,skip})
}

const findAllPublishForShop = async({query,limit,skip}) =>{
    return await queryProduct({query,limit,skip})
}

const searchproductByUser = async({keySearch}) =>{
    const regexSearch = new RegExp(keySearch)
    const results = await product.find({
        isPushlished : true,
        $text: {$search : regexSearch}},
        {score: {$meta : 'textScore'}}
        ).sort({score: {$meta : 'textScore'}})
        .lean()
    return results;
}

const publishProductByShop = async({product_shop, product_id}) =>{
    const foundShop = await product.findOne({
        product_shop : new Types.ObjectId(product_shop),
        _id : new Types.ObjectId(product_id),
    })
    if(!foundShop) return null

    foundShop.isDraft = false 
    foundShop.isPushlished = true

    const  { modifiedCount } = await foundShop.save()

    return modifiedCount
}

const unPublishProductByShop = async({product_shop, product_id}) =>{
    const foundShop = await product.findOne({
        product_shop : new Types.ObjectId(product_shop),
        _id : new Types.ObjectId(product_id),
    })
    if(!foundShop) return null

    foundShop.isDraft = true 
    foundShop.isPushlished = false

    const  { modifiedCount } = await foundShop.save()

    return modifiedCount
}

const findAllProduct = async({limit, sort, page , filter, select}) =>{
    const skip = (page -1) * limit;
    const sortBy = sort === 'ctime' ? {_id:-1} : {_id: 1}
    const products = await product.find(filter)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(getselectData(select))
    .lean()

    return products
}

const findProduct = async({product_id,unSelect}) =>{
    return await product.findById(product_id).select(unGetselectData(unSelect))
}

const queryProduct = async({query,limit,skip}) =>{
    return await product.find(query).
    populate('product_shop', 'name email -_id')
    .sort({updateAt: -1})
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()
}
module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unPublishProductByShop,
    searchproductByUser,
    findAllProduct,
    findProduct
}