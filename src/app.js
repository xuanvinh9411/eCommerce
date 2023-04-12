const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
//Init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

//Init DB
require('./dbs/init.mongodb')
const { countConnect , checkOverLoad } = require('./helpers/check.connect')
checkOverLoad();

//Init router
app.use('',require('./routes'))
// handling error

module.exports = app