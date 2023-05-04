'use strict'
const Shop = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { creaKeyTokenPair }  = require('../auth/authUtils')
const { getIntoData }  =require('../utils/index')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const RoleShop = {
    SHOP : 'SHOP',
    WRITER : 'WRITER',
}
class AccessService {

    static signUp = async ({name , email , password}) =>{
        try {
                const holderShop = await Shop.findOne({email}).lean()
                if(holderShop) {
                    return {
                        code : '',
                        message : "Shop already registered"
                    } 
                }

                const passwordHash = await bcrypt.hash(password, 10 ,)
                const newShop = await Shop.create({
                    name , email , password: passwordHash , roles : [RoleShop.SHOP]
                })

                if(newShop) {
                    // const { privateKey , publicKey } = crypto.generateKeyPairSync('rsa',{
                    //     modulusLength : 4096,
                    //     publicKeyEncoding: {
                    //         type : 'pkcs1',
                    //         format : 'pem'
                    //     },
                    //     privateKeyEncoding: {
                    //         type : 'pkcs1',
                    //         format : 'pem'
                    //     }
                    // })

                    const privateKey = crypto.randomBytes(64).toString('hex') ;
                    const publicKey = crypto.randomBytes(64).toString('hex') ;

                    const keyStore = await  KeyTokenService.createkeyToken({
                        userId : newShop._id,
                        publicKey  :publicKey ,
                        privateKey : privateKey
                    })
                    if(!keyStore){
                        return {
                            code : 'xxx',
                            message : 'publicKeyString error',
                        }
                    }

                    // const publicKeyObject = crypto.createPublicKey(publicKeyString)
                    //create token pair 
                    const tokens =  await creaKeyTokenPair({userId: newShop._id , email},publicKey,privateKey)
                    console.log(`Create Token Success:: `, tokens)

                    return {
                        code : 201,
                        metadata: {
                            shop : getIntoData({fileds:['_id','name','email'],object : newShop}),
                            tokens
                        }
                    }
                }
                return {
                    code :200,
                    metadata : null
                }
        } catch (error) {
            return {
                code : '',
                message : error.message,
                status: 'error'
            }
        }
    }
}
 module.exports =  AccessService