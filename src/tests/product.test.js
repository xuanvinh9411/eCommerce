const redisPubSubSerVice = require('../services/redisPubsub.service')

class ProductServiceTest{
    purchaseProduct(productId, quanlity){
        const order = {
            productId,
            quanlity
        }
        redisPubSubSerVice.publish('purchase_events', JSON.stringify(order))
    }
}

module.exports = new ProductServiceTest()
