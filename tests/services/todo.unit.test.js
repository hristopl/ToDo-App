import { getTodos, getArchivedTodos, updateTodos, add, archiveTodos, todoById, deleteTodoById } from '../../src/models/todo'
import { get, getArchived, update, isPositiveNumber, validatePageAndSize, validate, create, archive, getById, del } from '../../src/services/todo'
import { describe, expect, test } from '@jest/globals'

jest.mock('../../src/models/todo', () => ({
  getTodos: jest.fn(),
  getArchivedTodos: jest.fn(),
  updateTodos: jest.fn(),
  add: jest.fn(),
  archiveTodos: jest.fn(),
  todoById: jest.fn(),
  deleteTodoById: jest.fn()
}))

describe('get', () => {
  test('should return todos', async () => {
    const email = 'hristo@gmail.com'
    await get({ page: 1, size: 5 }, email)

    expect(getTodos).toHaveBeenCalledWith(email)
  })
})

describe('getArchived', () => {
  test('should return archived todos', async () => {
    const email = 'hristo@gmail.com'
    await getArchived({ page: 1, size: 5 }, email)

    expect(getArchivedTodos).toHaveBeenCalledWith(email)
  })
})

describe('update', () => {
  test('should update todo', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'Go to training today.',
      email: 'hristo@gmail.com'
    }

    const { email } = todo

    await update(todo, email)

    expect(updateTodos).toHaveBeenCalledWith(email)
  })
})

describe('create', () => {
  test('should create todo', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'Go to training today.',
      email: 'hristo@gmail.com'
    }

    const { email } = todo

    await create(todo, email)

    expect(add).toHaveBeenCalledWith(email)
  })
})

describe('archive', () => {
  test('should archive todo', async () => {
    const todo = {
      id: '545364a56a3546a',
      title: 'Go to gym',
      description: 'Go to training today.',
      email: 'hristo@gmail.com'
    }

    const { id, email } = todo

    await archive(id, email)

    expect(archiveTodos).toHaveBeenCalledWith(id, email)
  })
})

describe('getById', () => {
  test('should get todo by Id', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'Go to training today.',
      email: 'hristo@gmail.com'
    }

    const { email } = todo

    await getById(todo, email)

    expect(todoById).toHaveBeenCalledWith(todo, email)
  })
})

describe('del', () => {
  test('should delete todo', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'Go to training today.'
    }

    await del(todo)

    expect(deleteTodoById).toHaveBeenCalledWith(todo)
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

    // try {
    //   await validatePageAndSize(page, size)
    //   throw new Error('Should not get here!')
    // } catch (err) {
    //   expect(err.message).toBe(message)
    // }

    expect(validatePageAndSize(page, size)).rejects.toThrow(message)
  })
  test('should throw error if page or size is NaN', async () => {
    const message = 'Page or size is not valid!'
    const page = NaN
    const size = 4

    // try {
    //   await validatePageAndSize(page, size)
    //   throw new Error('Should not get here!')
    // } catch (err) {
    //   expect(err.message).toBe(message)
    // }

    expect(validatePageAndSize(page, size)).rejects.toThrow(message)
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

    // try {
    //   await validate(todo)
    //   throw new Error('Should not get here!')
    // } catch (err) {
    //   expect(err.message).toBe(message)
    // }

    expect(validate(todo)).rejects.toThrow(message)
  })
})
