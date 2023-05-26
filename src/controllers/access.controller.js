'use strict'

const AccessService = require("../services/access.service")
const { OKE , CREATED } = require('../core/success.response')
class AccessController {
    signup = async ( req, res, next) =>{
            new CREATED({
                message : 'Regiserted OK!',
                metadata : await AccessService.signUp(req.body)
            }).send(res);

    }
}

module.exports = new AccessController()