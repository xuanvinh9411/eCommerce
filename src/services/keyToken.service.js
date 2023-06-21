'use strict'

const keytokenModel = require("../models/keytoken.model");
const { Types } = require('mongoose')
class KeyTokenService {

    static createkeyToken = async({userId,publicKey,privateKey , refreshToken}) =>{
        try {
            //level 0 
            // const publicKeyString = publicKey.toString();
            // const tokens = await Key.create({
            //     user: userId,
            //     publicKey: publicKey,
            //     privataKey: privataKey,
            // })

            //level xx 
            const filter = {user : userId}, 
                  update ={ publicKey,privateKey,refreshToken: [], refreshToken },
                  options = { upsert : true , new : true}
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options); 
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
    static findByUserId = async (userId) =>{
        return await keytokenModel.findOne({user : new Types.ObjectId(userId)}).lean()
    }
    static removeKeyById = async (id)=>{
        return await keytokenModel.findByIdAndDelete(id)
    }
}

module.exports = KeyTokenService