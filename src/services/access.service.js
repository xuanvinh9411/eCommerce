'use strict'
const Shop = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const { creaKeyTokenPair }  = require('../auth/authUtils')
const { getIntoData }  =require('../utils/index')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { 
        BadRequestError, 
        ConflictRequestError,
        AuthFailureError
            } = require('../core/error.response')

//service
const {findByEmail} = require('./shop.service')

const RoleShop = {
    SHOP : 'SHOP',
    WRITER : 'WRITER',
    EDITOR : 'EDITOR',
    ADMIN :  'ADMIN',
}
class AccessService {

    static logout = async({keyStore}) =>{
        const delkey = await KeyTokenService.removeKeyById(keyStore._id);
        return delkey;
    }
    /*
        1- check email
        2- check password
        3- creaete Access Token vs refresh token . Save
        4- generate tokens
        5- get data return login
    */
    static login = async({email,password, refreshToken = null})  =>{

        //check email exists
        const foundShop = await findByEmail({email});
        if(!foundShop) throw new BadRequestError('Shop not registered')
        console.log({foundShop})
        // compare password 
        const match = bcrypt.compare(password,foundShop.password);
        if(!match) throw new AuthFailureError('Authentication error') 

        const privateKey = crypto.randomBytes(64).toString('hex') ;
        const publicKey = crypto.randomBytes(64).toString('hex') ;

        const tokens = await creaKeyTokenPair({userId: foundShop._id , email},publicKey,privateKey)
        await KeyTokenService.createkeyToken({
            userId : foundShop._id,
            privateKey,
            publicKey,
            refreshToken
        })
        return {
            metadata: {
                shop : getIntoData({fileds:['_id','name','email'],object : foundShop}),
                tokens
            }
        } 
    }
    static signUp = async ({name , email , password}) =>{
                const holderShop = await Shop.findOne({email}).lean()
                if(holderShop) {
                   throw new BadRequestError('Error: Shop already registerd!') 
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
                        throw new BadRequestError('Erro: publicKeyString error!') 

                        // return {
                        //     code : 'xxx',
                        //     message : 'publicKeyString error',
                        // }
                    }

                    // const publicKeyObject = crypto.createPublicKey(publicKeyString)
                    //create token pair 
                    const tokens =  await creaKeyTokenPair({userId: newShop._id , email},publicKey,privateKey)

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
    }
}
 module.exports =  AccessService