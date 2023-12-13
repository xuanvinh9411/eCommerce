'use strict'

const {product , clothing, electronic } = require('../models/product.model')
const { 
    BadRequestError, 
    AuthFailureError,
        } = require('../core/error.response')

class ProductFactory {
    /**
     *  type : 'Clothing'
     * payload
     */
    static async createProduct(type, payload) {
        switch (type){
            case "Electronics":
               return await new Electronics(payload).creaetProduct();
            case "Clothing":
               return await new Clothing(payload).creaetProduct();
            default:
                throw new BadRequestError(`Invalid Product Types ${type}`);
        }
    }
}

/*
    product_name : {type : String , required : true},
    product_thumb : {type : String , required : true},
    product_description : String,
    product_price: {type : Number , required : true},
    product_quantity : {type : String , required : true},
    product_type : {type : String , required : true, enum: ['Electronics', 'Clothing', 'Furniture']},
    product_shop : {type : Schema.Types.ObjectId , ref : 'Shop'},
    product_attributes : {type : Schema.Types.Mixed , required : true},
*/
//define base product class
class Product{
    constructor({
        product_name:product_name,
        product_thumb:product_thumb,
        product_description:product_description,
        product_price:product_price,
        product_quantity:product_quantity,
        product_type:product_type,
        product_shop:product_shop,
        product_attributes:product_attributes
    }){
        this.product_name=product_name;
        this.product_thumb=product_thumb;
        this.product_description=product_description;
        this.product_price=product_price;
        this.product_quantity=product_quantity;
        this.product_type=product_type;
        this.product_shop=product_shop;
        this.product_attributes=product_attributes;
    }

    // createe new product
    async createProduct(product_id){
        console.log("product_id",product_id)
        return await product.create({...this, _id : product_id})
    }
}

//define sub-class for different product types Clothing
class Clothing extends Product{
    async creaetProduct(){
        const newClothing = await clothing.create({...this.product_attributes,
            product_shop: this.product_shop
        })
        if(!newClothing) throw new BadRequestError('create new Clothing error');

        const newProduct = await super.createProduct()
        if(!newClothing) throw new BadRequestError('create new Product error');
        return newProduct;
    }
}


//define sub-class for different product types Electronics
class Electronics extends Product{
    async creaetProduct(){
        const newElectronic = await electronic.create({
            ...this.product_attributes,
        product_shop: this.product_shop,
    })
        console.log({newElectronic})
        if(!newElectronic) throw new BadRequestError('create new Electronic error');

        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new BadRequestError('create new Product error');
        return newProduct;
    }
}

module.exports = ProductFactory;