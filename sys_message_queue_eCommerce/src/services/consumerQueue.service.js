'use Strict';

const {
    consumerQueue,
    connectToRabbitMQ
} = require("../dbs/init.rabbit")

const consummetoQueueService =  (queueName) =>{
        try {
            const { channel , connection } = await connectToRabbitMQ()
            await consumerQueue(channel,queueName)
        } catch (error) {
            console.error(`Error consumerToQueue`,error )
        }
    }
}

module.exports = {consummetoQueueService}