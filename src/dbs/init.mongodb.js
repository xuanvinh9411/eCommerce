'use strict'

const mongoose = require("mongoose");
const config = require('../configs/config.mongodb')
// const connectString = 'mongodb://localhost:27017/'
const connectString = 'mongodb://deva$$:devp4$$@103.90.224.153:27017/myFirstDatabase'


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
            .connect(config.db)
            .then(_ => console.log(`Connect Mongodb Success`))
            .catch(err => console.error(`Erro Connect!`))
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