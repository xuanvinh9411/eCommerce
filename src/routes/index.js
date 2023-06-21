'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')
const { apiKey } = require('../auth/checkAuth')
const { authentication } = require('../auth/authUtils')

module.exports.init = (app) =>{
    app.use(apiKey);
    app.use(authentication);
    app.use('/v1/api',accessRouter);

    app.get('/', (req, res) => {
        res.send('Hello SI');
    });

    app.use(router)
}