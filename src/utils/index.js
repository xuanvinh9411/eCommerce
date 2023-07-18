'use strict'
const _ = require('lodash')

const getIntoData = ({ fileds = [],object = {}}) =>{
    return _.pick(object,fileds)
}

const getselectData = (select = []) =>{
    return Object.fromEntries(select.map(el => [el,1]))
}

const unGetselectData = (select = []) =>{
    return Object.fromEntries(select.map(el => [el,0]))
}

module.exports = { 
    getIntoData,
    getselectData,
    unGetselectData
 }