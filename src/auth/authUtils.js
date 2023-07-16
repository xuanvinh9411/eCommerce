'use strict'
const JWT = require('jsonwebtoken')
const asyncHandler = require('../helpers/asyncHandler')
const { 
    BadRequestError, 
    ConflictRequestError,
    AuthFailureError,
    NotFoundError
        } = require('../core/error.response')

//service
const { findByUserId } = require('../services/keyToken.service')
const HEADER = {
    API_KEY : 'x-api-key',
    CLIENT_ID : 'x-client-id',
    AUTHORIZATION : 'authorization',
    REFRESHTOKEN: 'x-rtoken-id'
}

const creaKeyTokenPair = async (payload , publicKey , privetaKey) =>{
    try {
        //accessToken
        const accessToken = await JWT.sign(payload , publicKey,{
            // algorithm : 'RS256',
            expiresIn : '2 days'
        })

        const refreshToken = await JWT.sign(payload , privetaKey,{
            // algorithm : 'RS256',
            expiresIn : '7 days'
        })

        JWT.verify(accessToken, publicKey,(err, decode) =>{
            if(err){
                console.log(`error verify::`,err)
            } else {
                console.log(`decode verify::`,decode)
            }
        })
        return {accessToken,refreshToken}

    } catch (error) {
        console.error(error.message)
    }
}

const authentication = asyncHandler(async(req, res, next)=>{
    /*
        ! 1- Check userId missing ???
        ! 2- get accessToken
        ! 3- verifyToken
        ! 4- check user in dbs?
        ! 5- check keyStore with this userId?
        ! 6- Oke all => return next()
    */
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invanlid Request');

    //2
    const keyStore = await findByUserId(userId)

    if(!keyStore) throw new NotFoundError('Not Found keyStore');

    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invanlid Request');
    try {
        const decodeUser = JWT.verify( accessToken,keyStore.publicKey )
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invanlid userId');
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }

})

const authenticationV2 = asyncHandler(async(req, res, next)=>{
    /*
        ! 1- Check userId missing ???
        ! 2- get accessToken
        ! 3- verifyToken
        ! 4- check user in dbs?
        ! 5- check keyStore with this userId?
        ! 6- Oke all => return next()
    */
    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new AuthFailureError('Invanlid Request');

    //2
    const keyStore = await findByUserId(userId)
    if(!keyStore) throw new NotFoundError('Not Found keyStore');

    //3
    if(req.headers[HEADER.REFRESHTOKEN]){
            try {
                const refreshToken = req.headers[HEADER.REFRESHTOKEN]
                const decodeUser = JWT.verify( refreshToken,keyStore.privateKey)
                if(userId !== decodeUser.userId) throw new AuthFailureError('Invanlid userId');
                req.keyStore = keyStore
                req.user = decodeUser
                req.refreshToken = refreshToken
                return next()
            } catch (error) {
                throw error
            }
    }


    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if(!accessToken) throw new AuthFailureError('Invanlid Request');
    try {
        const decodeUser = JWT.verify( accessToken,keyStore.publicKey )
        if(userId !== decodeUser.userId) throw new AuthFailureError('Invanlid userId');
        req.keyStore = keyStore
        req.user = decodeUser
        return next()
    } catch (error) {
        throw error
    }


})

const verifyJWT = async (token,keySecret) =>{
    return await JWT.verify(token,keySecret)
}

module.exports  = {
    creaKeyTokenPair,
    authentication,
    authenticationV2,
    verifyJWT
}