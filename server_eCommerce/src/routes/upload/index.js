'use strict'
const express = require('express')
const router = express.Router()
const upLoadController = require('../../controllers/upload.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')
const { upLoadDisk } = require('../../configs/multer.config');

router.post('/uploadImage',asyncHandler(upLoadController.UploadImage))
router.post('/uploadThumb',upLoadDisk.single('file'),asyncHandler(upLoadController.uploadFileThumb))
router.post('/uploadImageFromLocalFiles',upLoadDisk.array('files',3/*max 3 images*/),asyncHandler(upLoadController.uploadImageFromLocalFiles))

module.exports = router;
