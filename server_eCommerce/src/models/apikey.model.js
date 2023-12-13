'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'ApiKey'
const COLLECTION_NAME = 'ApiKeys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    key:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Boolean,
        required:true,
    },
    permissions:{
        type:[String],
        required:true,
        enum:['000','111','222'],
    }
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);