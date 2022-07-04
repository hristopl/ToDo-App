import { auth } from '../../src/controllers/authentication'
import { authenticate } from '../../src/services/authentication'
import { describe, test, expect } from '@jest/globals'
import e from 'express'

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

jest.mock('../../src/services/authentication', () => ({
  authenticate: jest.fn()
}))

describe('auth', () => {
  test('should get response', async () => {
    const session = {
      sessionId: '6ba81894bh348901i23'
    }

    const next = () => {}

    authenticate.mockResolvedValue(session)

    await auth({ query: session }, res, next)

    expect(authenticate).toHaveBeenCalledWith(session.sessionId)
  })
  test.skip('should throw error if session is null', async () => {
    const message = 'User not authenticated!'
    const session = {
      sessionId: null
    }

    const next = () => {}

    authenticate.mockResolvedValue(session)

    try {
      await auth({ query: session.sessionId }, res, next)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
  test('should throw error', async () => {
    const session = {
      sessionId: '6ba81894bh348901i23'
    }

    const next = () => {}

    authenticate.mockRejectedValue(new Error('Test error!'))

    await auth({ query: session }, res, next)

    expect(status).toHaveBeenCalledWith(401)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})
