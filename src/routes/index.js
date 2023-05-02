'use strict'
const express = require('express')
const router = express.Router()
const accessRouter = require('./access')

module.exports.init = (app) =>{
    app.use('/v1/api',accessRouter);

    app.get('/', (req, res) => {
        res.send('Hello SI');
    });

    app.use(router);
}