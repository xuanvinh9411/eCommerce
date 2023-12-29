'use Strict';

const {
    consumerQueue,
    connectToRabbitMQ
} = require("../dbs/init.rabbit")

const messageService = {
         consumerToQueue :  async (queueName) =>{
            try {
                const { channel , connection } = await connectToRabbitMQ()
                await consumerQueue(channel,queueName)
            } catch (error) {
                console.error(`Error consumerToQueue`,error )
            }
        },

        consumerToQueueNormal : async(queueName) =>{
            try {
                const { channel , connection } = await connectToRabbitMQ()
                const notiQueue = 'notificationQueueprocess'// asserQueue
                
                const timeExpried = 5000
                setTimeout(()=>{
                    channel.consume(notiQueue , msg =>{
                        console.log(`Send notificationQueueprocess sucessfullt processed :::`, msg.content.toString())
                        channel.ack(msg)
                    });
                },timeExpried)

               
            } catch (error) {
                console.error(error)
            }
        },

        consumerToQueueFailed :  async (queueName) =>{
            try {
                
                const { channel , connection } = await connectToRabbitMQ()

                const notificationExchangeDLX = 'notificationExDLX' //notificationEx direct
                const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX' // assert
                const notiQueueHandler = 'notificationQueueHotFix'
                
                await channel.assertExchange(notificationExchangeDLX, 'direct',{
                    durable : true
                })

                const queueResult = await channel.assertQueue(notiQueueHandler,{
                    exclusive : false
                });

                await channel.bindQueue(queueResult.queue,notificationExchangeDLX,notificationRoutingKeyDLX);
                await channel.consume(queueResult.queue, msgFailed =>{
                    console.log(`this notification error: , please hot fix ::: `,msgFailed.content.toString())
                },{
                    noAck: true
                })
            } catch (error) {
                console.error(`Error consumerToQueueFailedL`,error )
                throw error;
            }
        }

}

module.exports = messageService