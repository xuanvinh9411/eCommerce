'use strict'
const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cart.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')
const { permission } = require('../../auth/checkAuth')


// authentication 
router.use(authenticationV2) 

router.post('',asyncHandler(cartController.addtoCart))
router.post('update',asyncHandler(cartController.update))
router.delete('',asyncHandler(cartController.delete))
router.get('',asyncHandler(cartController.listToCart))

module.exports = router;
