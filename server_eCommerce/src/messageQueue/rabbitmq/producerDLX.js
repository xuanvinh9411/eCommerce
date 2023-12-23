const amqp = require('amqplib')

const runProducer = async () =>{
    try {
        const connection = await amqp.connect('amqp://guest:guest@localhost:5671');
        const channel = await connection.createChannel()

        const notificationExchange = 'notificationEx'// notificationEx direct
        const notiQueue = 'notificationQueueprocess'// asserQueue
        const notificationExchangeDLX = 'notificationExDLX' //notificationEx direct
        const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX' // assert

        // 1 . create Exchange
        await channel.assertExchange(notificationExchange,'direct',{
            durable: true
        });

        // 2 . create Queue
        const queueResult = await channel.assertQueue(notiQueue,{
            exclusive: false,
            deadLetterExchange : notificationExchangeDLX,
            deadLetterRoutingKey : notificationRoutingKeyDLX
        });

        // 3. bindQueue
        await channel.bindQueue(queueResult.queue,notificationExchange)

        //4 . Senmessage
        const msg = 'a new Product'
        await channel.sendToQueue(queueResult.queue, Buffer.from(msg),{
            expiration : '10000'
        })

        setTimeout(() => {
                connection.close();
                process.exit(0)
        }, 500);
    } catch (error) {
        console.error(`runProducer`,error.message)
    }
}

runProducer().then(result => console.log(result)).catch(console.error)