'use strict'

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION : 'authorization'
}

const { findById } = require('../services/apikey.service')
const apiKey = async (req,res,next) =>{
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        //check objKey
        const objKey = await findById(key)
        console.log("objKey",objKey)
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) {
        
    }
}

const permission = ( permission ) => {
    return (req,res,next) => {
        if(!req.objKey.permission){
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        console.log('permission::',req.objKey.permission)
        const valiPermission = req.objKey.permission.includes(permission)
        if(!valiPermission){
            return res.status(403).json({
                message: 'permission denied'
            })
        }
        return next()
    }
}
const asyncHandler = fn =>{
     return (req,res,next) =>{
        fn(req,res,next).catch(next);
     }
}
module.exports = {
    apiKey,
    permission,
    asyncHandler,
}