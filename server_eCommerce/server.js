const app = require('./src/app')

const PORT = process.env.DEV_APP_PORT || 3052
console.log(`process.env.DEV_APP_PORT`,process.env.AWS_BUCKET_SECRET_KEY)
const server =  app.listen( PORT , () =>{
    console.log(`WVS eCommerce start with ${PORT}`)
})


// process.on('SIGINT', ()=>{
//     server.close( ()=> console.log(" server out off"))
// })