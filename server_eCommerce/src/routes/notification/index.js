'use strict'
const express = require('express')
const router = express.Router()
const notificationController = require('../../controllers/notification.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')


// authentication 
router.use(authenticationV2) 

router.post('',asyncHandler(notificationController.pushNotification))
router.get('',asyncHandler(notificationController.getListNotiByUser))

module.exports = router;
