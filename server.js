import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const port = 3000
const vitePort = 5173 // set in ./vite.config.ts

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${vitePort}`,
  },
})

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

  if (bool) {
    const i = (count % 5) - 1
    console.log(timestamps.at(i), `count: ${count}`)
  }
}

function incrementAndBroadcast(socket) {
  socket.on('increment', amount => {
    count += amount
    // broadcast to all connected clients
    io.emit('updateCount', count)
    logCounterIncrement(true)
  })
}

function updateCount(socket) {
  socket.emit('updateCount', count)
}

// socket.io entry point
io.on('connection', socket => {
  console.log('a user connected')
  updateCount(socket)
  incrementAndBroadcast(socket)
})

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})
