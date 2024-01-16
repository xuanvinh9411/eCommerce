const amqp = require('amqplib')

const consumerOrderdMessage = async () =>{
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:15672');
        const channel = await connection.createChannel()

        const queueName = 'ordered-queued-message'
        await channel.assertQueue(queueName,{
            durable : true
        })
        
        channel.consum(queueName, msg =>{
            const message = msg.content.toString()
            setTimeout(() => {
                console.log('processed: ', message)
                channel.ack(msg)
            }, Math.random()* 1000);
        });
        for (let i = 0; i < 10; i++) {
            const massage = `order-queue-mnessage::${i}`
            console.log(`message : ${massage}`)
            channel.sendToQueue(queueName , Buffer.from(message),{
                persistent: true
            })
        }
        setTimeout(() => {
            connection.close()
        }, 1000);
    } catch (error) {
        console.error(`runProducer`,error.message)
    }
}

consumerOrderdMessage().catch(err =>console.error(err))