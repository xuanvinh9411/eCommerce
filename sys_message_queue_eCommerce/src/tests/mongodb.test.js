'use strict' 

const mongoose = require('mongoose')
const connectString = 'localhost:27017'

const TestSchema = new mongoose.Schema({name : String})
const Test = mongoose.model(`Test`,TestSchema)

describe('Mongoose Connect', async () =>{
    let connection 

    beforeAll( async () =>{
        connection = await mongoose.connect(connectString)
    })

    afterAll( async ()=>{
        await connection.disconnect()
    })

    it('should connect to mongoose ', ()=>{
        expect(mongoose.connection.readyState).toBe()
    })

    it('should save a document to the database', async () =>{
        const user = new Test({name : "vinh dev"})
        await user.save()
        expect(user.isNew).toBe(false)
    })
})