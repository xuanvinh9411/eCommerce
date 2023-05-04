'use strict'
const JWT = require('jsonwebtoken')

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

module.exports  = {
    creaKeyTokenPair
}