import { auth } from '../../src/controllers/authentication'
import { authenticate } from '../../src/services/authentication'
import { describe, test, expect } from '@jest/globals'

const json = jest.fn()
const status = jest.fn()
const send = jest.fn()

const res = {
  send,
  json,
  locals: {},
  status: (...args) => {
    status(...args)
    return { json }
  }
}

jest.mock('../../src/services/authentication', () => ({
  authenticate: jest.fn()
}))

const next = jest.fn()

describe('auth', () => {
  test('should get response', async () => {
    const session = {
      sessionId: '6ba81894bh348901i23'
    }

    authenticate.mockResolvedValue(session)

    await auth({ query: session }, res, next)

    expect(authenticate).toHaveBeenCalledWith(session.sessionId)
    expect(next).toHaveBeenCalled()
  })
  test('should throw error if session is null', async () => {
    const sessionId = '123'

    authenticate.mockResolvedValue(null)

    await auth({ query: sessionId }, res, next)

    expect(status).toHaveBeenCalledWith(401)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'User not authenticated!' })
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
