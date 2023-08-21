const InventoryService = require("../services/inventory.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class InventoryController {
    addStockToInventory = async (req,res,next) =>{
        new SuccessResponse({
            message:'Checkout success',
            metadata : await InventoryService.addStockToInventory(req.body)
        }).send(res)
    }
  
}

module.exports = new InventoryController()