const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const Router = require('./routes/index')
const app = express()
require('dotenv').config();
//Init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded(({
    extended : true
})))
// test mua product 
// require('./tests/inventory.test')
// const product = require('./tests/product.test')
// product.purchaseProduct("quan",10)
//Init DB
require('./dbs/init.mongodb')
const { countConnect , checkOverLoad } = require('./helpers/check.connect')
// checkOverLoad();

//Init router
// app.use('',require('./routes'))
Router.init(app)
// handling error
app.use(( req, res, next) => {
    const error = new Error('not Found')
    error.status = 404
    error.log = 'test log'
    next(error)
})
app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    const log = error.log 
    return res.status(statusCode).json({
        status: 'error',
        code : statusCode,
        stack : error.stack,
        message : error.message || 'InterNal Server Error'
    })
})
module.exports = app