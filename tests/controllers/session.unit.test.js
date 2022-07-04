import { createSession } from '../../src/controllers/session.js'
import { create } from '../../src/services/session.js'
import { describe, test, expect } from '@jest/globals'

const json = jest.fn()
const status = jest.fn()
const send = jest.fn()

const res = {
  send,
  json,
  status: (...args) => {
    status(...args)
    return { json }
  }
}

jest.mock('../../src/services/session', () => ({
  create: jest.fn()
}))

describe('createSession', () => {
  test('should get response', async () => {
    const data = {
      email: 'hristo@gmail.com'
    }

    create.mockResolvedValue(data)

    await createSession(data, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!', data })
  })
  test('should throw error', async () => {
    const data = {
      email: 123
    }

    create.mockRejectedValue(new Error('Test error!'))

    await createSession(data, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})
