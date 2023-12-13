'use strict'

const { Schema, model } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Notification'
const COLLECTION_NAME = 'Notifications'

// ORDER-001: order successfully
// ORDER-002: order faild
//  PROMOTION-001:  NEW PROMOTION
//  SHOP-001: new product by user following

// Declare the Schema of the Mongo model
var notificationtSchema = new Schema({
    noti_type: { type: String, emun: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'SHOP-001'], required: true },
    noti_senderId: { type:  Schema.Types.ObjectId , required: true },
    noti_receivedId : { type : Number , required : true , ref : 'Shop'},
    noti_content : { type : String , required : true },
    noti_options : { type : Object , default : { } },
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = model(DOCUMENT_NAME, notificationtSchema);