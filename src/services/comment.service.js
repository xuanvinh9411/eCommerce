'use strict'

const  Comment  = require('../models/comment.model')

const { BadRequestError } = require('../core/error.response')
const { convertToObjectIdMongdb } = require('../utils/index')

class CommentService {
    static async createComment({
        userId,
        productId,
        content,
        parentId,
    }){
        const comment = new Comment({
            comment_userId: userId,
            comment_productId: productId,
            comment_content: content,
            comment_parentId: parentId,
        })

        let rightValue
        if(parentId){

        }else{
            const maxRightValue = await Comment.findOne({
                comment_productId : convertToObjectIdMongdb(productId),
            },'comment_right',{sort:{comment_right : -1}})
            if(maxRightValue){
                rightValue = maxRightValue.comment_right + 1
            }else{
                rightValue = 1
            }
        }
        
        comment.comment_left = rightValue
        comment.comment_left = rightValue + 1
        await comment.save();
        return comment
    }
}
module.exports = InventoryService