'use strict'
const _ = require('lodash')
const {Types} = require('mongoose')

const convertToObjectIdMongdb = id  => Types.ObjectId(id);

const getIntoData = ({ fileds = [],object = {}}) =>{
    return _.pick(object,fileds)
}

const getselectData = (select = []) =>{
    return Object.fromEntries(select.map(el => [el,1]))
}

const unGetselectData = (select = []) =>{
    return Object.fromEntries(select.map(el => [el,0]))
}

const removeUndefinedObject = obj => {
    Object.keys(obj).forEach( k => {
        if(obj[k] == null){
            delete obj[k];
        }
    })
    return obj
}


/* 
    const a = {
        c : {
            d : 1
        }
    }
    => {
        `c.d`:1
    }
**/
const updateNestedObjectParser = obj =>{
    const final = {}

    Object.keys(obj).forEach(k =>{
        if( typeof obj[k] === 'object' && !Array.isArray(obj[k])){
            const response = updateNestedObjectParser(obj[k])
            Object.keys(response).forEach(a =>{
                final[`${k}.${a}`]=response[a]
            })
        } else {
            final[k] = obj[k]
        }
    })
    return final
}

module.exports = { 
    getIntoData,
    getselectData,
    unGetselectData,
    removeUndefinedObject,
    updateNestedObjectParser,
    convertToObjectIdMongdb
 }