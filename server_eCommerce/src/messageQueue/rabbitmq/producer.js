const amqp = require('amqplib')
const message  = 'hello world!';

const runProducer = async () =>{
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:5671');
        const channel = await connection.createChannel()

        const channelName = 'test-topic'
        await channel.assertQueue(channelName,{
            durable : true
        })
        channel.sendToQueue(channelName, Buffer.from(message))
        console.log(`message sent:`,message)
    } catch (error) {
        console.error(`runProducer`,error.message)
    }
}

runProducer()