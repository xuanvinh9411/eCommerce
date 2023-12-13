'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:'Shop',
    },
    privateKey:{
        type:String,
        required:true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshTokensUsed:{
        type:Array,
        default:[],
    },
    refreshToken:{
        type : String,
        required : true
    }
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);