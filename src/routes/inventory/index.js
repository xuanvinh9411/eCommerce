'use strict'
const express = require('express')
const router = express.Router()
const inventoryController = require('../../controllers/inventory.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')


// authentication 
router.use(authenticationV2) 

router.post('',asyncHandler(inventoryController.addStockToInventory))

module.exports = router;
