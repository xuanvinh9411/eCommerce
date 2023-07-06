'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')
const productRouter = require('./product')
const { apiKey } = require('../auth/checkAuth')

module.exports.init = (app) =>{
    app.use(apiKey);
    app.use('/v1/api',accessRouter);
    app.use('/v1/api/product',productRouter);

    app.get('/', (req, res) => {
        res.send('Hello SI');
    });

    app.use(router)
}