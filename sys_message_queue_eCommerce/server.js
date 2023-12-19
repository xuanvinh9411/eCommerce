'use stric'
const { consummetoQueueService } = require(`./src/services/consumerQueue.service`)
const queueName = ' ';

consummetoQueueService(queueName).then( () =>{
    console.log(`Message comsummer started ${queueName}`)
})
.catch((err)=>{
console.error(err.message)
})