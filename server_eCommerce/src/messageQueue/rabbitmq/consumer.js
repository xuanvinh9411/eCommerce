const amqp = require('amqplib')

const runConsumer = async () =>{
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost');
        const channel = await connection.createChannel()

        const channelName = 'test-topic'
        await channel.assertQueue(channelName,{
            durable : true
        })
        channel.consume(channelName, (message) =>{
            console.log(`Received ${message.content.toString()}`)
        },{
            noAck : true
        })
    } catch (error) {
        console.error(`runProducer`,error.message)
    }
}

runConsumer()