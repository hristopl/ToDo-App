import { validateSession, checkPass, create } from '../../src/services/session.js'
import { addSession } from '../../src/models/session.js'
import { describe, test, expect } from '@jest/globals'
import { findByEmail } from '../../src/models/user.js'

jest.mock('../../src/models/session', () => ({
  addSession: jest.fn()
}))

jest.mock('../../src/models/user', () => ({
  findByEmail: jest.fn()
}))

describe('validateSession', () => {
  test('should validateSession', async () => {
    const auth = {
      email: 'hristo@abv.bg',
      password: '12345'
    }

    const result = await validateSession(auth)

    expect(result).toBe(auth)
  })
  test('should throw error', async () => {
    const message = 'Email, password are required!'

    const auth = {
      email: null
    }

    try {
      await validateSession(auth)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
})

describe('checkPass', () => {
  test('should checkPass', async () => {
    const auth = {
      email: 'icko@abv.bg',
      password: '12345'
    }

    findByEmail.mockResolvedValue({
      email: 'icko@abv.bg',
      password: '827ccb0eea8a706c4c34a16891f84e7b'
    })

    const result = await checkPass(auth)

    expect(result).toEqual(auth)
  })
  test('should throw error', async () => {
    const message = 'Password doesn\'t match!'
    const auth = {
      email: 'icko@abv.bg',
      password: '12344'
    }

    try {
      await checkPass(auth)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
})

describe('create', () => {
  test('should create session', async () => {
    const data = {
      email: 'icko@abv.bg',
      password: '12345'
    }

    await create(data)

    expect(addSession).toHaveBeenCalledWith(data)
  })
})
