'use strict'

const mongoose  = require("mongoose")
const os = require('os')
const _SECONDS = 5000
 
const countConnect = () =>{
    const numConnect = mongoose.connections.length
    console.log(`Number of Connections`,numConnect)
}

//check over load
const checkOverLoad = () =>{
    setInterval( () => {
        const numConnect = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss;
        //example maximum number of connection based on number osf cores
        const maxConnections = numCores * 5;

        console.log(`Active connection ${numConnect}`);
        console.log(`numCores ${numCores}`);
        console.log(`Memory usage:: ${memoryUsage /1024 /1024} MB`)
        if(numConnect>maxConnections) console.log(`Connection overload detected`)
    },_SECONDS)
}
module.exports = { countConnect,checkOverLoad }