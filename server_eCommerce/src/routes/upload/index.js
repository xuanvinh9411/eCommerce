'use strict'
const express = require('express')
const router = express.Router()
const upLoadController = require('../../controllers/upload.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

router.post('/uploadImage',asyncHandler(upLoadController.UploadImage))

module.exports = router;
