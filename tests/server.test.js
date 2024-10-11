import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import ioc from 'socket.io-client'

import { logCounterIncrement } from '../server.js'

// Test log function
describe('server should start with count = 0', () => {
  expect(count).toEqual(0)
})

// code from: https://stackoverflow.com/a/76271250
describe('test logCounterIncrement', () => {
  const consoleMock = vi
    .spyOn(console, 'log')
    .mockImplementation(() => undefined)

  afterAll(() => {
    consoleMock.mockReset()
  })

  it('should log datetime and count', () => {
    const timestamps = []
    const now = new Date().toUTCString()
    timestamps.push(now)
    logCounterIncrement(true)
    // Even though we are logging one datetime entry, the count for this
    // test will still be 0, as the test function is referencing the initial
    // value of count on the server (which is 0).
    expect(consoleMock).toHaveBeenLastCalledWith(now, 'count: 0')
  })
})

// Test socket
// see docs: https://socket.io/docs/v4/testing/
describe('test socket client/server communication', () => {
  let io, serverSocket, clientSocket

  beforeAll(() => {
    return new Promise(resolve => {
      const httpServer = createServer()
      io = new Server(httpServer)
      httpServer.listen(() => {
        const port = httpServer.address().port
        clientSocket = ioc(`http://localhost:${port}`)
        io.on('connection', socket => {
          serverSocket = socket
        })
        clientSocket.on('connect', resolve)
      })
    })
  })

  afterAll(() => {
    io.close()
    clientSocket.disconnect()
  })

  it('client and server should communicate', () => {
    return new Promise(resolve => {
      clientSocket.on('hello', arg => {
        expect(arg).toEqual('there')
        resolve()
      })
      serverSocket.emit('hello', 'there')
    })
  })
})
