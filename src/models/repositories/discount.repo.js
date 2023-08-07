'use strict'

const { unGetselectData, getselectData } = require('../../utils/index')

const findAllDiscountCodesUnSelect = async({
   limit = 50, page = 1, sort = 'ctime',
   filter , unSelect , model
}) =>{
    const skip = (page -1) * limit;
    const sortBy = sort === 'ctime' ? {_id:-1} : {_id: 1}
    const documents = await model.find()
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .select(unGetselectData(unSelect))
    .lean()
    return documents
}


const findAllDiscountCodesSelect = async({
    limit = 50, page = 1, sort = 'ctime',
    filter , select , mode
 }) =>{
     const skip = (page -1) * limit;
     const sortBy = sort === 'ctime' ? {_id:-1} : {_id: 1}
     const documents = await mode.find(filter)
     .sort(sortBy)
     .skip(skip)
     .limit(limit)
     .select(getselectData(select))
     .lean()
 
     return documents
 }

 const checkDiscountExists = async ({model ,filter}) =>{
    console.log("model",model)
    console.log("filter",filter)
    return await model.findOne(filter).lean()
 }


module.exports = {
    findAllDiscountCodesUnSelect,
    findAllDiscountCodesSelect,
    checkDiscountExists
}