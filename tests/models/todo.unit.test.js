import mongoose from 'mongoose'
import { getTodos } from '../../src/models/todo'
import { describe, expect, test } from '@jest/globals'

jest.mock('mongoose', () => ({
  model: jest.fn(),
  connect: jest.fn(),
  Schema: function () { return { index: jest.fn() } }
})
)

const findFn = jest.fn()
const sortFn = jest.fn()
const skipFn = jest.fn()
const limitFn = jest.fn()
const leanFn = jest.fn()
const thenFn = jest.fn()

const obj = (fn, method) => (...args) => {
  fn(...args)
  return method
}

const thenObj = obj(thenFn, thenFn)
const leanObj = obj(leanFn, thenObj)
const limitObj = obj(limitFn, leanObj)
const skipObj = obj(skipFn, limitObj)
const sortObj = obj(sortFn, skipObj)
const findObj = obj(findFn, sortObj)

describe.skip('getTodos', () => {
  test('should work', () => {
    mongoose.model.mockImplementation(() => ({ find: findObj }))

    getTodos({ page: 1, size: 5 })

    expect(limit).toHaveBeenCalledWith(5)
  })
})
