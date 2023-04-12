'use strict'

class AccessController {
    signup = async (req,res,next) =>{
        try {
            console.log(`[P]::signup::`,req.body)

            return res.status(200).json({
                code:'20001',
                metadata: { userID : 1}
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AccessController()