'use strict'

const AccessService = require("../services/access.service")

class AccessController {
    signup = async (req,res,next) =>{
        try {
            console.log(`[P]::signup::`,req.body)

            return res.status(200).json(await AccessService.signUp(req.body))
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()