'use strict'
const shopMode = require("./models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const RoleShop = {
    SHOP : 'SHOP',
    WRITER : 'WRITER',
}
class AccessService {
    static signUp = async ({name , email , password}) =>{
        try {
            const holderShop = await shopMode.findOne({email}).lean()
            if(holderShop) {
                return {
                    code : '',
                    message : "Shop already registered"
                } 
            }

            const passwordHash = await bcrypt.hash(password, 10 ,)
            const newShop = await shopMode.create({
                name , email , password: passwordHash , roles : [RoleShop.SHOP]
            })

            if(newShop) {
                const { privateKey , publicKey } =  crypto.generateKeyPairSync('rsa',{
                    modulusLength : 4096
                })
            }

            const publicKeyString = await  Ket
        } catch (error) {
            return {
                code : '',
                message : error.message,
                status: 'error'
            }
        }
    }
}