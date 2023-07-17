'use strict'
const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

// authentication 
router.post('/',asyncHandler(productController.createProduct))
router.post('/publish/:id',asyncHandler(productController.publishProductByShop))
router.use(authenticationV2) 

// Query //
/**
 * 
 */
router.get('/drafts/all',asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all',asyncHandler(productController.getAllPublishForShop))

module.exports = router;
