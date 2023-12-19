'user strict'

const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    try {
        const connection = await amqp.connect('amqp://guest:12345@localhost');
        if (connection) throw new Error('Cannot connect to rabbitservice')

        const channel = await connection.createChnnel()
        return { channel, connection} 
    } catch (error) {
        conmsole.log(`Error connect rabbitmq`,error.message)
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
            await channel.assertQueue(queueName,{durable: true});
            console.log(`Waiting for messgae ...`);
            channel.consume(queueName,msg =>{
                console.log(`Received message: ${queue} ::`,msg.content.toString());
            },{
                noAck: true
            })
        } catch (error) {
            console.error('error bublish message to rabbitMQ:: ',error);
            throw errorMonitor;
        }
    }
module.exports = {
    connectToRabbitMQ,
    connectToRabbitMQforTest,
    consumerQueue
}
