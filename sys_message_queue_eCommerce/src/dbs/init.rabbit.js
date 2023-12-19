'user strict'

const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost');
        if (!connection) throw new Error('Cannot connect to rabbitservice')

        const channel = await connection.createChannel()
        return { channel, connection} 
    } catch (error) {
        console.log(`Error connect rabbitmq`,error.message)
    }
}

    const connectToRabbitMQforTest = async() =>{

        try {
            const { channel,connection } = await connectToRabbitMQ()

            const queue = 'test-queue'
            const message = 'Hello, ShopDev by anonystick'
            await channel.assertQueue(queue);
            await sendToQueue(queue, Buffer.from(message))
    
            await connection.close()
        } catch (error) {
              conmsole.log(`Error connect rabbitmq for test`,error.message)
        }
    }

    const consumerQueue = async ( channel, queueName) =>{
        try {
            await channel.assertQueue(queueName,
                                                            {durable: true});
            console.log(`Waiting for messgae ...`,queueName);
            channel.consume(queueName,message =>{
                console.log(`Received ${message.content.toString()}`)
            },{
                noAck: false
            })
        } catch (error) {
            console.error('error bublish message to rabbitMQ:: ',error);
            throw error;
        }
    }
module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQforTest,
    consumerQueue
}
