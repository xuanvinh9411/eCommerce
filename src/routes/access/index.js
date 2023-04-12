'use strict'
const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller')
//
router.post('/sigup',accessController.signup)
module.exports = router

 export default router ; 
