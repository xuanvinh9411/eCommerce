'use strict'

const mongoose = require("mongoose");
const {MONGO_URI,connectOptions} = require('../configs/config.mongodb')

class Database {
    constructor() {
        this.connect()
    }

    //connect
    connect(type = 'mongodb'){
        if(1 === 1){
            mongoose.set('debug',true);
            mongoose.set('debug',{color : true});
        }
        mongoose
            .connect(MONGO_URI,connectOptions)
            .then(_ => console.log(`Connect Mongodb Success`))
            .catch(err => console.error(`Erro Connect!`,err))
    }

    static getInstance(){
        if(!Database.instance){
            Database.instance = new Database
        }
        return Database.instance
    }
}

const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb