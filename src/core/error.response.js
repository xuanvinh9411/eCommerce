'use strict'
const StatusCode = {
    FORBIDDEN : 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN : 'Bad request error',
    CONFLICT : 'Conflict error'
}

const {
    StatusCodes,
    ReasonPhrases
} = require('../utils/httpStatusCode')

class ErrorRepsonse extends Error {
    constructor(message,status){
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorRepsonse{
    constructor(message = ReasonStatusCode.CONFLICT,statusCode = StatusCode.FORBIDDEN){
            super(message,statusCode)
    }
}


class BadRequestError extends ErrorRepsonse{
    constructor(message = ReasonStatusCode.CONFLICT,statusCode = StatusCode.FORBIDDEN){
            super(message,statusCode)
    }
}

class AuthFailureError extends ErrorRepsonse{
    constructor(message = ReasonPhrases.UNAUTHORIZED, statusCode = StatusCodes.UNAUTHORIZED){
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorRepsonse{
    constructor(message = ReasonPhrases.NOT_FOUND, statusCode = StatusCodes.NOT_FOUND){
        super(message, statusCode)
    }
}


module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFoundError,
    AuthFailureError
}