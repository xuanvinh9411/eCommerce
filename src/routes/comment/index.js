'use strict'
const express = require('express')
const router = express.Router()
const commentController = require('../../controllers/comment.controller')
const asyncHandler = require('../../helpers/asyncHandler')
const { authenticationV2 } = require('../../auth/authUtils')

// router.post('/amount',asyncHandler(discountController.getDiscountAmount))

// authentication 
router.use(authenticationV2) 

router.post('',asyncHandler(commentController.createComment))

router.get('',asyncHandler(commentController.getCommentsByParentId))

module.exports = router;
