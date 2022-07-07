import mongoose from 'mongoose'
import { addUser, findByEmail } from '../../src/models/user'
import { describe, test, expect } from '@jest/globals'

jest.mock('mongoose', () => ({
  userModel: {
    create: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis()
  },
  model: function () { return this.userModel },
  connect: jest.fn(),
  Schema: function () { return { index: jest.fn() } }
}))

describe('addUser', () => {
  test('should create user', () => {
    const User = mongoose.model()

    const user = {
      _id: '6142366142a646142a',
      name: 'Hristo',
      password: '12345'
    }

    const { email, ...rest } = user

    addUser(user)

    expect(User.create).toHaveBeenCalledWith({ ...rest, _id: email })
  })
})

describe('findByEmail', () => {
  test('should find email', () => {
    const User = mongoose.model()

    const email = 'hristo@gmail.com'

    findByEmail(email)

    expect(User.findById).toHaveBeenCalledWith(email)
    expect(User.lean).toHaveBeenCalled()
  })
})
