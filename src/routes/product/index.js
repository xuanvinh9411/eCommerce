'use strict'
const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

router.get('/search/:keySearch',asyncHandler(productController.getListSearchProduct))
router.get('',asyncHandler(productController.findAllProducts))
router.get('/:product_id',asyncHandler(productController.findProducts))

// authentication 
router.use(authenticationV2) 

router.post('/',asyncHandler(productController.createProduct))
router.patch('/:product_id',asyncHandler(productController.updateProduct))
router.post('/publish/:id',asyncHandler(productController.publishProductByShop))
router.post('/unpublish/:id',asyncHandler(productController.unPublishProductByShop))

// Query //
router.get('/drafts/all',asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all',asyncHandler(productController.getAllPublishForShop))

module.exports = router;
