const redisPubSubSerVice = require('../services/redisPubsub.service')

class InventoryServiceTest{
    constructor(){
        redisPubSubSerVice.subscriber('purchase_events',(channel,message)=>{
            InventoryServiceTest.updateInventory(message)
        })
    }
    updateInventory(productId, quantity){
        console.log(`Update Inventory ${productId} with quantity ${quantity}`)
    }
}

module.exports = new InventoryServiceTest()
