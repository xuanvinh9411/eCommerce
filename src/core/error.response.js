'use strict'
const StatusCode = {
    FORBIDDEN : 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN : 'Bad request error',
    CONFLICT : 'Conflict error'
}

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

module.exports = {
    ConflictRequestError,
    BadRequestError
}