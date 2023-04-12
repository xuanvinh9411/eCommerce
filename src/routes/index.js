'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access/index')
export function init(app){

    app.use('./v1/access',accessRouter);
    app.use(router);
}