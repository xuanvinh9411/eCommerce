'use strict'

const  Comment  = require('../models/comment.model')
const { getProductById } = require('../models/repositories/product.repo')
const { BadRequestError, NotFoundError } = require('../core/error.response')
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
            const parentComment = await Comment.findById(parentId)
            if(parentComment) throw new NotFoundError(`parent comment not found`)
            rightValue = parentComment.comment_right

            //update many comments 
            await Comment.updateMany({
                comment_productId : convertToObjectIdMongdb(productId),
                comment_right : {$gte : rightValue}
            },{
                $inc : {comment_right : 2}
            })

            await Comment.updateMany({
                comment_productId : convertToObjectIdMongdb(productId),
                comment_left : {$gt : rightValue}
            },{
                $inc : {comment_left : 2}
            })

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
        return comment;
    }

    static async getlistCommentsByParentId({
        productId,
        parentCommentId = null,
        limit = 50,
        offset = 0 // skip
    }){
        if(parentCommentId){
            const parentComment = await Comment.findById(parentCommentId)
            if(!parent) throw new NotFoundError(`not dounf parentId`)

            const comments = await Comment.find({
                comment_productId : convertToObjectIdMongdb(productId),
                comment_left : {$gt : parentComment.comment_left},
                comment_right : {$lte : parentComment.comment_right}
            }).select({
                comment_left : 1,
                comment_right : 1,
                comment_content : 1,
                comment_parentId : 1,
            }).sort({
                comment_left : 1
            })
            return comments;
        }

        const comments = await Comment.find({
            comment_productId : convertToObjectIdMongdb(productId),
            comment_parentId : convertToObjectIdMongdb(parentCommentId),
        }).select({
            comment_left : 1,
            comment_right : 1,
            comment_content : 1,
            comment_parentId : 1,
        }).sort({
            comment_left : 1
        })
        return comments;
    }

    static async deleteComments({
        productId , 
        commentId ,
    }){
        const product = await getProductById(productId)
        if(!product) throw new NotFoundError(`not found product`)

        const comment = await Comment.findById(commentId)
        if(!comment) throw new NotFoundError(`not found Comment`)

        const leftValue = comment.comment_left
        const rightValue = comment.rightValue

        const width = rightValue - leftValue

        await Comment.deleteMany({
            comment_productId : convertToObjectIdMongdb(productId),
            comment_left : {$gte : leftValue,$lte : rightValue},
        })


        //check delete trong khoảng
        // await Comment.deleteMany({
        //     comment_productId : convertToObjectIdMongdb(productId),
        //     comment_right : {$lte : rightValue},
        //     comment_left : {$gte : leftValue},
        // })

        await Comment.updateMany({
            comment_productId : convertToObjectIdMongdb(productId),
            comment_left : {$gt : rightValue}
        },{
            $inc : {comment_left : -width}
        })

        await Comment.updateMany({
            comment_productId : convertToObjectIdMongdb(productId),
            comment_left : {$gt : rightValue}
        },{
            $inc : {comment_right : -width}
        })
    }
}
module.exports = CommentService