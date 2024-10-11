import { afterAll, describe, it, expect, vi } from 'vitest'
import { logCounterIncrement } from '../server.js'

// code from: https://stackoverflow.com/a/76271250
describe('should mock console.log', () => {
  const consoleMock = vi
    .spyOn(console, 'log')
    .mockImplementation(() => undefined)

  afterAll(() => {
    consoleMock.mockReset()
  })

  it('should log `1`', () => {
    const timestamps = []
    const now = new Date().toUTCString()
    timestamps.push(now)
    logCounterIncrement(true)
    expect(consoleMock).toHaveBeenLastCalledWith(now, 'count: 0')
  })
})
