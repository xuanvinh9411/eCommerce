'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')
const productRouter = require('./product')
const discountRouter = require('./discount')
const { apiKey } = require('../auth/checkAuth')

module.exports.init = (app) =>{
    app.use(apiKey);
    app.use('/v1/api/discount',discountRouter);
    app.use('/v1/api/product',productRouter);
    app.use('/v1/api',accessRouter);

    app.get('/', (req, res) => {
        res.send('Hello SI');
    });

    app.use(router)
}