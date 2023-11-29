const NotiService = require("../services/notification.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')

class NotificationController {
    pushNotification = async (req,res,next) =>{
        new SuccessResponse({
            message:'Push noti success',
            metadata : await NotiService.pushNoti(req.body)
        }).send(res)
    }

    getListNotiByUser = async (req,res,next) =>{
        new SuccessResponse({
            message:'Get List Noti success',
            metadata : await NotiService.getListNotiByUser(req.query)
        }).send(res)
    }
  
}

module.exports = new NotificationController()