import { authenticate } from '../../src/services/authentication'
import { findSessionById } from '../../src/models/session'
import { describe, test, expect } from '@jest/globals'

jest.mock('../../src/models/session', () => ({
  findSessionById: jest.fn()
}))

describe('authenticate', () => {
  test('should authenticate', async () => {
    const sessionId = {
      sessionId: '12837j12831j1gfg123'
    }

    await authenticate(sessionId)

    expect(findSessionById).toHaveBeenCalledWith(sessionId)
  })
})
