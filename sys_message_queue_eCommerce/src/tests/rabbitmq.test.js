'use strict';

const { describe } = require("node:test");
const {
    connectToRabbitMQforTest
} = require(`../dbs/init.rabbit`)

describe('RabbitMQ Connect', ( )=>{
    it('should connect to successful RabbitMQ', async()=>{
        const result = await connectToRabbitMQforTest()
        expect(result).toBeUndefined();
    })
})