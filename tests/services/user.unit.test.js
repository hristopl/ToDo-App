import { validateUser, hashPassword, create, listUserByEmail } from '../../src/services/user.js'
import { addUser, findByEmail } from '../../src/models/user.js'
import { describe, test, expect } from '@jest/globals'
jest.mock('../../src/models/user', () => ({
  addUser: jest.fn(),
  findByEmail: jest.fn()
}))

describe('validateUser', () => {
  test('should validate user', async () => {
    const user = {
      name: 'Hristo',
      email: 'hristo@gmail.com',
      password: '12345'
    }

    const result = await validateUser(user)

    expect(result).toBe(user)
  })
  test('should throw error', async () => {
    const message = 'Name, email or password are required!'

    const user = {
      name: null
    }

    try {
      await validateUser(user)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
})

describe('hashPassword', () => {
  test('should hash password', () => {
    const user = {
      name: 'Hristo',
      password: '12345'
    }

    const result = hashPassword(user)
    const { password } = result

    expect(password).toBe('827ccb0eea8a706c4c34a16891f84e7b')
  })
})

describe('create', () => {
  test('should create user', async () => {
    const user = {
      name: 'Hristo',
      email: 'hristo@gmail.com',
      password: '12345'
    }

    const result = hashPassword(user)

    await create(user)

    expect(addUser).toHaveBeenCalledWith(result)
  })
})

describe('listUserByEmail', () => {
  test('should list user by email', async () => {
    const user = {
      name: 'Hristo',
      email: 'hristo@gmail.com',
      password: '12345'
    }

    await listUserByEmail(user)

    expect(findByEmail).toHaveBeenCalledWith(user)
  })
})
