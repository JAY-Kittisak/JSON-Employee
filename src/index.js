import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import server from './server'

const { DB_USER, DB_PASSWORD, DB_NAME, PORT } = process.env

const createServer = async () => {
    try {
       await mongoose.connect(
           `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jz3rb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
           { useUnifiedTopology: true }
        )
        .then(() => {
            console.log('MongoDB Connected');
        })
        //! ทำ function async await เพราะ ต้องอนุญาต(permit) ในการเชื่อต่อ Mongodb ให้ได้ก่อนถึงจะทำขึ้นตอนต่อไป
        const app = express()
        
        server.applyMiddleware({ app })
        
        app.listen({ port: PORT }, () =>
            console.log(
                `Server ready at http://localhost:${PORT}${server.graphqlPath}`
            )
        )
        
    } catch (error) {
        console.log(error)
    }
}

createServer()