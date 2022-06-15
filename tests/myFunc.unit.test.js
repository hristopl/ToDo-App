import { isPositiveNumber, validatePageAndSize, validate } from '../src/services/todo.js'
import { convertSingleId } from '../src/models/todo.js'
import { describe, test, expect } from '@jest/globals'

describe('isPositiveNumber', () => {
  test('should return false if value is NaN', () => {
    const number = 't'

    const result = isPositiveNumber(number)

    expect(result).toBe(false)
  })
  test('should return true if value is NaN', () => {
    const number = 5

    const result = isPositiveNumber(number)

    expect(result).toBe(true)
  })
  test('should return false if value is NaN', () => {
    const number = ''

    const result = isPositiveNumber(number)

    expect(result).toBe(false)
  })
})

describe('validatePageAndSize', () => {
  test('should validate page and size', async () => {
    const page = 4
    const size = 5

    const result = await validatePageAndSize(page, size)

    expect(result).toEqual({ page: 4, size: 5 })
  })
  test('should throw an error', async () => {
    const message = 'Page or size is not valid!'
    const page = 4
    const size = -1

    try {
      await validatePageAndSize(page, size)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
  test('', async () => {
    const page = NaN
    const size = 4

    const result = await validatePageAndSize(page, size)

    console.log(result)
  })
})

describe('validate', () => {
  test('should validate title and description', async () => {
    const todo = {
      title: 'Go to Gym',
      description: "I have to go to gym at 11 o'clock."
    }

    const result = await validate(todo)

    expect(result).toEqual(todo)
  })
  test('should throw an error', async () => {
    const message = 'Title or description is Nil!'
    const todo = {
      title: null,
      description: 'I have to take a nap.'
    }

    try {
      await validate(todo)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
  })
})

describe('convertSingleId', () => {
  test('should convert Id of todo', () => {
    const todo = {
      _id: 194932042234
    }

    const result = convertSingleId(todo)

    expect(result).toEqual({
      id: 194932042234
    })
  })
})
