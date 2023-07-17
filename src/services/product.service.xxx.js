'use strict'

const {product , clothing, electronic , funiture } = require('../models/product.model')
const { findAllDraftsForShop,
        publishProductByShop,
        findAllPublishForShop } = require('../models/repositories/product.repo')
const { 
    BadRequestError, 
    AuthFailureError,
        } = require('../core/error.response')

class ProductFactory {
    /**
     * payload
     */
    static productRegistry = { }

    static registerProductType(type , classRef){
        ProductFactory.productRegistry[type] = classRef
    }
   
    static async createProduct(type, payload) 
    {
        const productClass = ProductFactory.productRegistry[type]
        if(!productClass) throw new BadRequestError(`Invalid Product Types ${type}`);
        return new productClass(payload).creaetProduct()
        
    }

    // PUT //
    static async publishProductByShop({product_shop, product_id}){
      return await publishProductByShop({product_shop, product_id})
    }
    //END PUT //

    static async findAllDraftsForShop({product_shop,limit = 50 ,skip = 0}){
        const query  = { product_shop , isDraft : true}
        return await findAllDraftsForShop({query ,limit , skip})
    }

    static async findAllPublishForShop({product_shop,limit = 50 ,skip = 0}){
        const query  = { product_shop , isPushlished : true}
        return await findAllPublishForShop({query ,limit , skip})
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
        if(!newElectronic) throw new BadRequestError('create new Electronic error');

        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new BadRequestError('create new Product error');
        return newProduct;
    }
}


//define sub-class for different product types Funiture
class Funitures extends Product{
    async creaetProduct(){
        const newFuniture = await funiture.create({
            ...this.product_attributes,
        product_shop: this.product_shop,
    })
        if(!newFuniture) throw new BadRequestError('create new newFuniture error');

        const newProduct = await super.createProduct(newFuniture._id)
        if(!newProduct) throw new BadRequestError('create new Product error');
        return newProduct;
    }
}

// register product types
ProductFactory.registerProductType('Clothing',Clothing)
ProductFactory.registerProductType('Electronics',Electronics)
ProductFactory.registerProductType('Furniture',Funitures)
module.exports = ProductFactory;