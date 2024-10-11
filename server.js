import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

let count = 0
let timestamps = []

// Logs the date and time of counter increments.
// A maximum of 5 logs are stored.
export function logCounterIncrement(bool) {
  const datetime = new Date().toUTCString()
  if (timestamps.length >= 5) {
    timestamps = []
  }
  timestamps.push(datetime)

  // enable console logging of dates and count
  if (bool) {
    const i = (count % 5) - 1
    console.log(timestamps.at(i), `count: ${count}`)
  }
}

io.on('connection', socket => {
  console.log('a user connected')

  // update newly connected client with current count
  socket.emit('updateCount', count)

  socket.on('increment', amount => {
    count += amount
    // broadcast to all connected clients
    io.emit('updateCount', count)
    logCounterIncrement(true)
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
