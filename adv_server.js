import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import {WebSocketServer} from 'ws'
const PORT = process.env.PORT
const app = express()

const server = app.listen(PORT,()=>{
    console.log('server running....')
})

const wss = new WebSocketServer({server})

wss.on('connection',(ws,req)=>{
    console.log('handshake upgraded, new client connected')

    const parameters= new URLSearchParams(req.url.split('?')[1])
    const hallId = parameters.get('hallId')

    ws.currenthall = hallId
    ws.on('message',(data)=>{
        console.log(`Server Received: ${data}`)

        const message = data.toString()
      wss.clients.forEach((client)=>{
        if(client.currenthall === ws.currenthall && client !== ws && client.readyState === 1){
            client.send(`new update: ${message}`)
        }
      })
    })

    ws.on('close',()=>{
        console.log("user hanged up")
    })
})