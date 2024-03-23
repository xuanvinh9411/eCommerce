'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')
const productRouter = require('./product')
const discountRouter = require('./discount')
const checkoutRouter = require('./checkout')
const inventoryRouter = require('./inventory')
const notificationRouter = require('./notification')
const cartRouter = require('./cart')
const commentRouter = require('./comment')
const uploadRouter = require('./upload')
const { apiKey } = require('../auth/checkAuth')

module.exports.init = (app) =>{
    // app.use(apiKey);
    app.use('/v1/api/upload',uploadRouter);
    app.use('/v1/api/notification',notificationRouter);
    app.use('/v1/api/discount',discountRouter);
    app.use('/v1/api/comment',commentRouter);
    app.use('/v1/api/checkout',checkoutRouter);
    app.use('/v1/api/inventory',inventoryRouter);
    app.use('/v1/api/cart',cartRouter);
    app.use('/v1/api/product',productRouter);
    app.use('/v1/api',accessRouter);

    app.get('/', (req, res) => {
        res.send('Hello SI');
    });

    app.use(router)
}