import express from 'express'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

import path from 'node:path'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const port = 3000
const vitePort = 5173 // hard set in ./vite.config.ts as well

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

// socket.io //

function incrementAndBroadcast(socket) {
  socket.on('increment', amount => {
    count += amount
    io.emit('updateCount', count) // io.emit broadcasts to all connected clients
    logCounterIncrement(true)
  })
}

io.on('connection', socket => {
  console.log('a user connected')
  socket.emit('updateCount', count) // update count for newly connected client
  incrementAndBroadcast(socket)
})

// Express serves html when dealing with a static build
// In this case, both websockets and html will be served over the same port
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'dist')))

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})
