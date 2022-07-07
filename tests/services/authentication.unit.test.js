import { authenticate } from '../../src/services/authentication'
import { findSessionById, refreshSession } from '../../src/models/session'
import { describe, test, expect } from '@jest/globals'

jest.mock('../../src/models/session', () => ({
  findSessionById: jest.fn(),
  refreshSession: jest.fn()
}))

describe('authenticate', () => {
  test('should authenticate', async () => {
    const id = '123'
    const session = '567'

    findSessionById.mockResolvedValue(session)

    await authenticate(id)

    expect(findSessionById).toHaveBeenCalledWith(id)
    expect(refreshSession).toHaveBeenCalledWith(session)
  })
})
