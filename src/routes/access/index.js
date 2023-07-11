'use strict'
const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authentication,authenticationV2 } = require('../../auth/authUtils')

router.post('/shop/signup',asyncHandler(accessController.signup))
router.post('/shop/login',asyncHandler(accessController.login))
// authentication 
router.use(authenticationV2)
router.get('/shop/logout',asyncHandler(accessController.logout))
router.get('/shop/handelRefreshToken',asyncHandler(accessController.handelRefreshToken))

module.exports = router;
