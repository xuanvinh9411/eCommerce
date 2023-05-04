'use strict'

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {

    static createkeyToken = async({userId,publicKey,privataKey}) =>{
        try {
            // const publicKeyString = publicKey.toString();
            const tokens = await Key.create({
                user: userId,
                publicKey: publicKey,
                privataKey: privataKey,
            })
            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    }
}

module.exports = KeyTokenService