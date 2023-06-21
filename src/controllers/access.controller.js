'use strict'

const AccessService = require("../services/access.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')
class AccessController {

    logout = async (req, res ,next) =>{
        new SuccessResponse({
            message: 'Logout success!',
            metadata : await AccessService.logout({keyStore:req.keyStore})
        }).send(res)
    }

    login = async (req, res ,next) =>{
        new SuccessResponse({
            metadata : await AccessService.login(req.body)
        }).send(res)
    }
    
    signup = async ( req, res, next) =>{
            new CREATED({
                message : 'Regiserted OK!',
                metadata : await AccessService.signUp(req.body)
            }).send(res);

    }
}

module.exports = new AccessController()