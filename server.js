import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {WebSocketServer} from 'ws'
const PORT  = process.env.PORT || 3000
const app = express()

const server = app.listen(PORT, ()=>{
    console.log(`Server running on PORT:${PORT}...............`)
})

const wss = new WebSocketServer({server})

wss.on('connection',(ws)=>{
    console.log(`a new client has connected via websockets`)

    ws.on('message',(data)=>{
        console.log(`server received:${data}`)

        ws.send(`message: ${data}`)
    })
    
    ws.on('close',()=>{
        console.log(`user left`)
    })
})