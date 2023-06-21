'use strict'
const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
const asyncHandler = require('../../helpers/asyncHandler')

router.post('/shop/signup',asyncHandler(accessController.signup))
router.post('/shop/login',asyncHandler(accessController.login))
router.get('/shop/logout',asyncHandler(accessController.logout))

module.exports = router;
