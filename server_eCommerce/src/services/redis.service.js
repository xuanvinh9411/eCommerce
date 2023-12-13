'use strict'

const redis = require('redis');
const { promisify } = require('util');
const { product } = require('../models/product.model');
const redisClient = redis.createClient()
const { reservationInventory } = require('../models/repositories/inventory.repo')

const acquireLock = async (productId,quantity,carId) => {
    const pexpire = promisify(redisClient.pexpire).bind(redisClient)
    const setnxAsync = promisify(redisClient.setnx).bind(redisClient)
    const key = `lock_v2013_${productId}`
    const retryTimes = 10;
    const expireTime = 3000; //3 seconds tam lock 
    for (let index = 0; index < retryTimes.length; index++) {
         //tao một key ai giữ thì người đó thanh toán 
        const result = await setnxAsync(key,expireTime);
        console.log(`result :::`,result);
        if(result === 1){
            // thao tac với inventory
            const isReversation = await reservationInventory({productId,quantity,carId});
            if(isReversation.modifiedCount){
                // giải phóng keys 
                await pexpire(key,expireTime)
                return key
            } else {
                return null;
            }
        }else{
            await new Promise((resolve)=> setTimeout(resolve,50))
        }
    }
}

const releaseLock = async keyLock =>{
    const delAsyncKey = promisify(redisClient.del).bind(redisClient)
    return await delAsyncKey(keyLock)
}

module.exports = {
    acquireLock,
    releaseLock
}