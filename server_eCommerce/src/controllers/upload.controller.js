const UploadService = require("../services/upload.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')
const { 
    BadRequestError, 
    AuthFailureError,
    ForbiddenError
        } = require('../core/error.response');


class UploadController {

    UploadImage = async (req,res,next) =>{
        new SuccessResponse({
            message:'Upload image success',
            metadata : await UploadService.upLoadImageFormUrl(req.body)
        }).send(res)
    }

    uploadFileThumb = async (req, res, next) =>{
        const { file } = req
        if(!file) throw new BadRequestError('File missing')
    
        new SuccessResponse({
            message : 'upload successfully uploaded',
            metadata : await UploadService.uploadImageFromLocal({
                path : file.path
            })
        }).send(res)
    }

    uploadImageFromLocalFiles = async (req, res, next) =>{
        const { files } = req
        if(!files.length) throw new BadRequestError('File missing')
    
        new CREATED({
            message : 'upload successfully uploaded',
            metadata : await UploadService.uploadImageFromLocalFiles({
                files
            })
        }).send(res)
    }

    uploadImageFromLocalS3 = async (req, res, next) =>{
        const { file } = req.body
        console.log(file)
        if(!file.length) throw new BadRequestError('File missing')
    
        new CREATED({
            message : 'upload successfully uploaded',
            metadata : await UploadService.uploadImageFromLocalS3({
                file
            })
        }).send(res)
    }


}



module.exports = new UploadController()