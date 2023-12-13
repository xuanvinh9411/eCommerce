'use strict'
const express = require('express')
const router = express.Router()
const discountController = require('../../controllers/discount.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

router.post('/amount',asyncHandler(discountController.getDiscountAmount))
router.post('/list_product_code',asyncHandler(discountController.getAllDiscountCodesWithProducts))


// authentication 
router.use(authenticationV2) 

router.post('',asyncHandler(discountController.createProduct))
router.get('',asyncHandler(discountController.getAllDiscountCodes))

module.exports = router;
