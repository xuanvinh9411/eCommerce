'use strict'

const { model, Schema } = require('mongoose');
const slugify = require('slugify')
const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name : {type : String , required : true},
    product_thumb : {type : String , required : true},
    product_description : String,
    product_slug : String,
    product_price: {type : Number , required : true},
    product_quantity : {type : String , required : true},
    product_type : {type : String , required : true, enum: ['Electronics', 'Clothing', 'Furniture']},
    product_shop : {type : Schema.Types.ObjectId , ref : 'Shop'},
    product_attributes : {type : Schema.Types.Mixed , required : true},
    ///more 
    product_ratingsAverage : {
        type : Number,
        default : 4.5,
        // 4.3456666 => 4.3
        set : (val) => Math.round(val * 10) /10
    },
    product_variations : {type : Array, default : []},
    isDraft : {type : Boolean, default : true, index: true , select: false},
    isPushlished : {type : Boolean, default : false, index: true , select: false}
},{
    collection : COLLECTION_NAME,
    timestamps: true
})

// create Index for search
productSchema.index({product_name: 'text',product_description : 'text'})
// Document middleware : runs bdefore .save() and .create()...
productSchema.pre('save', function(next){
    this.product_slug = slugify(this.product_name,{lower : true})
    next();
})
//type clothing

const clothingSchema = new Schema({
    brand : {type : String,require: true},
    size : String,
    material : String,
    product_shop: {type : Schema.Types.ObjectId , ref : 'Shop'},
},{
    collection : 'clothes',
    timestamps: true
})

const electronicSchema = new Schema({
    manufacturer : {type : String,require: true},
    model : String,
    color : String,
    productshop: {type : Schema.Types.ObjectId , ref : 'Shop'},
},{
    collection : 'electonics',
    timestamps: true
})

const funitureSchema = new Schema({
    brand : {type : String,require: true},
    size : String,
    material : String,
    product_shop: {type : Schema.Types.ObjectId , ref : 'Shop'},
},{
    collection : 'funitures',
    timestamps: true
})

module.exports = {
    product : model(DOCUMENT_NAME,productSchema),
    electronic : model('Electronics',electronicSchema),
    clothing : model('Clothing',clothingSchema),
    funiture : model('Funiture',funitureSchema),
}
