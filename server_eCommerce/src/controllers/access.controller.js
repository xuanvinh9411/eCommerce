'use strict'

const AccessService = require("../services/access.service")
const { OKE , CREATED ,SuccessResponse } = require('../core/success.response')
class AccessController {

    // handelRefreshToken = async (req, res ,next) =>{
    //     new SuccessResponse({
    //         message: 'Get token success!',
    //         metadata : await AccessService.handelRefreshToken(req.body.refreshToken)
    //     }).send(res)
    // }
    
    //v2 fix no need accesstoken
    handelRefreshToken = async (req, res ,next) =>{
        new SuccessResponse({
            message: 'Get token success!',
            metadata : await AccessService.handelRefreshTokenV2({
                keyStore : req.keyStore,
                user: req.user,
                refreshToken : req.refreshToken
            })
        }).send(res)
    }

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