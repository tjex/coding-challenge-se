import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

let count = 0

io.on('connection', socket => {
  console.log('a user connected')

  // update newly connected client with current count
  socket.emit('updateCount', count)

  socket.on('increment', amount => {
    count += amount
    // broadcast to all connected clients
    io.emit('updateCount', count)
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
