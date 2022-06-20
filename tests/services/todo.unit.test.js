import { getTodos, getArchivedTodos, updateTodos } from '../../src/models/todo'
import { get, getArchived, update, isPositiveNumber, validatePageAndSize, validate, convertSingleId } from '../../src/services/todo'
import { describe, expect, test } from '@jest/globals'

jest.mock('../src/models/todo', () => ({
  getTodos: jest.fn(),
  getArchivedTodos: jest.fn(),
  updateTodos: jest.fn()
}))

describe('get', () => {
  test('should return todos', async () => {
    await get({ page: 1, size: 5 })

    expect(getTodos).toHaveBeenCalledWith({ page: 1, size: 5 })
  })
  test('should parse page and size', async () => {
    await get({ page: '1', size: '5' })

    expect(getTodos).toHaveBeenCalledWith({ page: 1, size: 5 })
  })
})

describe('getArchived', () => {
  test('should return archived todos', async () => {
    await getArchived({ page: 1, size: 5 })

    expect(getArchivedTodos).toHaveBeenCalledWith({ page: 1, size: 5 })
  })
  test('should parse page and size', async () => {
    await getArchived({ page: '1', size: '5' })

    expect(getArchivedTodos).toHaveBeenCalledWith({ page: 1, size: 5 })
  })
})

describe('update', () => {
  test('should update todo', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'Go to training today.'
    }

    await update(todo)

    expect(updateTodos).toHaveBeenCalledWith(todo)
  })
})

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
  test('should throw error if page or size is NaN', async () => {
    const message = 'Page or size is not valid!'
    const page = NaN
    const size = 4

    try {
      await validatePageAndSize(page, size)
      throw new Error('Should not get here!')
    } catch (err) {
      expect(err.message).toBe(message)
    }
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
