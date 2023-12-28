'use stric'
const { consummetoQueueService , consumerToQueueNormal, consumerToQueueFailed } = require(`./src/services/consumerQueue.service`)
const channelName = 'test-topic'

consummetoQueueService(channelName).then( () =>{
    console.log(`Message comsummer started ${channelName}`)
})
.catch((err)=>{
console.error(err.message)
})