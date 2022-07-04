import { createUser, listUser } from '../../src/controllers/user.js'
import { create, listUserByEmail } from '../../src/services/user.js'
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

jest.mock('../../src/services/user', () => ({
  create: jest.fn(),
  listUserByEmail: jest.fn()
}))

describe('createUser', () => {
  test('should get response', async () => {
    const user = {
      name: 'Hristo',
      email: 'hristo@gmail.com',
      password: '12345'
    }

    create.mockResolvedValue(user)

    await createUser({ body: user }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!' })
  })
  test('should throw error', async () => {
    const user = {
      name: 123
    }
    create.mockRejectedValue(new Error('Test error!'))

    await createUser({ body: user }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('listUser', () => {
  test('should get response', async () => {
    const user = {
      name: 'Hristo',
      email: 'hristo@gmail.com',
      password: '12345'
    }

    listUserByEmail.mockResolvedValue(user)

    await listUser({ params: user.email }, res)

    expect(json).toHaveBeenCalledWith(user)
  })
  test('should throw error', async () => {
    const user = {
      email: 123
    }

    listUserByEmail.mockRejectedValue(new Error('Test error!'))

    await listUser({ params: user.email }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})
