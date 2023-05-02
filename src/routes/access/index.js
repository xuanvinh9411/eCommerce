'use strict'
const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')

router.post('/shop/signup',accessController.signup)

module.exports = router;
