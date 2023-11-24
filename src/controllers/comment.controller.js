const CommentService = require("../services/comment.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class CommentController {
    createComment = async (req,res,next) =>{
        new SuccessResponse({
            message:'Create comment success',
            metadata : await CommentService.createComment(req.body)
        }).send(res)
    }

    getCommentsByParentId = async (req,res,next) =>{
        new SuccessResponse({
            message:'Get List Comment success',
            metadata : await CommentService.getlistCommentsByParentId(req.query)
        }).send(res)
    }
  
}

module.exports = new CommentController()