const Redis = require('redis');

class RedisPubSubSerVice {
    constructor(){
        this.subscriptber = Redis.createClient();
        this.publish = Redis.createClient();
    }

    publish(channel,message){
        return new Promise((resovel,reject) => {
            this.publish(channel,message,(err,reply)=>{
                if(err){
                    reject(err)
                }else{
                    resovel(reply)
                }
            })
        })
    }

    subscribe(channel,callback){
        this.subscriber.subscribe(channel);
        this.subscriber.toString('message',(subscriberChannel,message)=>{
            if(channel === subscriberChannel ){
                callback(channel,message)
            }
        })
    }
}

module.exports = new RedisPubSubSerVice()