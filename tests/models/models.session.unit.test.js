import mongoose from 'mongoose'
import { addSession, findSessionById, refreshSession } from '../../src/models/session'
import { describe, test, expect } from '@jest/globals'

jest.mock('mongoose', () => ({
  sessionModel: {
    create: jest.fn().mockReturnThis(),
    updateOne: jest.fn().mockReturnThis(),
    then: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis()
  },
  model: function () { return this.sessionModel },
  connect: jest.fn(),
  Schema: function () { return { index: jest.fn() } }
}))

jest.mock('mongodb', () => ({
  db: jest.fn(),
  collection: jest.fn()
}))

describe('addSession', () => {
  test('should create session', () => {
    const Session = mongoose.model()

    const data = {
      email: 'hristo@gmail.com',
      createdAt: Date.now()
    }

    addSession(data)

    expect(Session.create).toHaveBeenCalledWith(data)
    expect(Session.then).toHaveBeenCalled()
  })
})

describe('findSessionById', () => {
  test('should find session', () => {
    const Session = mongoose.model()

    const id = '6216223612a62a60'

    findSessionById(id)

    expect(Session.findById).toHaveBeenCalledWith(id)
    expect(Session.lean).toHaveBeenCalled()
  })
})

describе('refreshSession', () => {
  test('should refresh session', async () => {
    const Session = mongoose.model()

    const session = {
      _id: '6165a6z65as62',
      email: 'hristo@gmail.com',
      createdAt: Date.now()
    }

    const filter = { _id: session._id }
    const updated = { $set: { createdAt: Date.now() } }

    await refreshSession(filter, updated)

    expect(Session.updateOne).toHaveBeenCalled(filter, updated)
  })
})
