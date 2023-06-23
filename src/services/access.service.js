'use strict'
const Shop = require('../models/shop.model')
const KeyTokenService = require('./keyToken.service')
const ShopService = require('./shop.service')
const { creaKeyTokenPair, verifyJWT }  = require('../auth/authUtils')
const { getIntoData }  =require('../utils/index')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { 
        BadRequestError, 
        AuthFailureError,

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

    static handelRefreshToken = async (refreshToken) =>{
        
        const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken);
        // resresh token use
        if(foundToken){
            // decode check user
            const {userId} = await verifyJWT(refreshToken,foundToken.privateKey)
            // delete key
            await KeyTokenService.deleteKeyById(userId)
            throw new ForbiddenError('Something wrong happend !! pls relogin')
        }

        // check refresh token exitst
        const holderToken = await KeyTokenService.findByRefreshToken(refreshToken);
        if(!holderToken) throw new AuthFailureError('Shop not regiteted')

        //verify token
        const {userId, email} = await verifyJWT(refreshToken,holderToken.privateKey)
        const foundShop = await ShopService.findByEmail({email})
        if(!foundShop) throw new AuthFailureError('Shop not regiteted')

        //create new token mới
        const tokens = await creaKeyTokenPair({userId, email},holderToken.publicKey,holderToken.privateKey)

        await holderToken.updateOne({
            $set:{
                refreshToken : tokens.refreshToken,
            },
            $addToSet:{
                refreshTokensUsed : refreshToken,
            }
        })

        return {
            user: {userId},
            tokens
        }
    }

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
            refreshToken : tokens.refreshToken
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