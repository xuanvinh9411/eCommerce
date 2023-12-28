const amqp = require('amqplib')
const message  = 'hello microservice';

const runProducer = async () =>{
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:15672');
        const channel = await connection.createChannel()

        const channelName = 'test-topic'
        await channel.assertQueue(channelName,{
            durable : true
        })
        channel.sendToQueue(channelName, Buffer.from(message))
        console.log(`message sent:`,message)
        setTimeout(()=>{
            connection.close();
            process.exit(0);
        })
    } catch (error) {
        console.error(`runProducer`,error.message)
    }
}

runProducer()