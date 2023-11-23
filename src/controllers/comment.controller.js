const CommentService = require("../services/comment.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class CommentController {
    createComment = async (req,res,next) =>{
        new SuccessResponse({
            message:'Checkout success',
            metadata : await CommentService.createComment(req.body)
        }).send(res)
    }

  
}

module.exports = new CommentController()