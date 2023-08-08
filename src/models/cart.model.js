'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'Cart'
// Declare the Schema of the Mongo model

var cartSchema = new mongoose.Schema({
    cart_state : {
        type:String,
        enum:['active','completed','failed','padnsing'],
        default :'active',
        /**
         * {
         *  productId,
         *  shopId,
         * quantity,
         * name,
         * price
         * }
         */
    },
    cart_products:{type: Array,required: true, default:[]},
    cart_count_product :{type:Number,default:0},
    cart_userId:{type:Number,required:true},
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, cartSchema);