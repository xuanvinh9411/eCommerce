const UploadService = require("../services/upload.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class UploadController {

    UploadImage = async (req,res,next) =>{
        new CREATED({
            message:'Upload image success',
            metadata : await UploadService.upLoadImageFormUrl(req.body)
        }).send(res)
    }


}

module.exports = new UploadController()