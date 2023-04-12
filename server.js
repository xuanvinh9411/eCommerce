const app = require('./src/app')

const PORT = 3055

const server =  app.listen( PORT , () =>{
    console.log(`WVS eCommerce start with ${PORT}`)
})


// process.on('SIGINT', ()=>{
//     server.close( ()=> console.log(" server out off"))
// })