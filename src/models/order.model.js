'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'order'
const COLLECTION_NAME = 'orders'
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    order_userId : {type : Number, require : true},
    order_checkout : { tpe : Object, default : {}},
    /*
        order_checkout = {
            totalPrice,
            totalApllyDiscount.
            freeShip
        }
    */
   order_shipping : {type : Object, default : {}},
   /*
        street,
        city
        state
        country
   */
  order_payment: { type : Object, default : true},
  order_products : { type: Array, require: true },
  order_trackingNumber : { type : String , default :'#0000118052022'},
  order_status : { 
                    type : String ,
                    enum : ['pending','confirmed','shipped','cancelled','delivered'],
                    default : 'pending'
                }
},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, orderSchema);