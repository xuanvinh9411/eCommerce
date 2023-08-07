'use strict'

const mongoose = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Discount'
const COLLECTION_NAME = 'discounts'
// Declare the Schema of the Mongo model
var discountSchema = new mongoose.Schema({
    discount_name : {type : String, required : true},
    discount_description : {type : String, required : true},
    discount_type : {type : String, default : 'fixed_amount'},//fixed_amount : money . percentage : %
    discount_value : { type: Number, required : true},
    discount_code : {type : String , required : true},
    discount_start_date : {type : Date, required : true},
    discount_end_date : {type : Date, required : true},
    discount_max_uses : { type: Number, required : true},// max user uses
    discount_uses_count : { type: Number, required : true}, // quanlity discount uses
    discount_users_used :  { type: Array, default : []},
    discount_max_uses_per_user : {type : Number, required : true}, // max quanlity once user uses
    discount_min_oder_value : { type : Number, required : true},
    discount_shopId : {type: mongoose.Schema.Types.ObjectId, ref: 'Shop'},
    discount_is_active: {type: Boolean, default : true},
    discount_applies_to : {type: String, required : true, enum: ['all','specific'] },
    discount_product_ids: { type : Array,default: []}

},{
    collection : COLLECTION_NAME,
    timestamps : true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, discountSchema);