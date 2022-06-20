import { createTodos, listTodos, todoById, listArchivedTodos, updateTodos, deleteTodo, archiveTodos } from '../../src/controllers/todo'
import { describe, test, expect } from '@jest/globals'
import { create, get, getById, getArchived, update, archive, del } from '../../src/services/todo'

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

jest.mock('../../src/services/todo', () => ({
  create: jest.fn(),
  get: jest.fn(),
  getById: jest.fn(),
  getArchived: jest.fn(),
  update: jest.fn(),
  archive: jest.fn(),
  del: jest.fn()
}))

describe('createTodos', () => {
  test('should get response', async () => {
    const todo = {
      title: 'Go to gym',
      description: 'go to training'
    }
    create.mockResolvedValue(todo)

    await createTodos({ body: todo }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!', todo })
  })
  test('should throw error', async () => {
    const todo = {
      title: 123,
      description: 1234
    }

    create.mockRejectedValue(new Error('Test error!'))

    await createTodos({ body: todo }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('listTodos', () => {
  test('should get response', async () => {
    const todo = {
      title: 'Onenone',
      description: 'Twowowo'
    }

    get.mockResolvedValue(todo)

    const url = ({ page: 1, size: 2 })

    await listTodos(url, res)

    expect(json).toHaveBeenCalledWith(todo)
  })
  test('should throw error', async () => {
    get.mockRejectedValue(new Error('Test error!'))

    const url = ({ page: 1, size: 2 })

    await listTodos(url, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('todoById', () => {
  test('should get response', async () => {
    const todo = {
      id: 1,
      title: 'Onenone',
      description: 'Twowowo'
    }
    getById.mockResolvedValue(todo)

    await todoById({ params: todo.id }, res)

    expect(json).toHaveBeenCalledWith(todo)
  })
  test('should throw error', async () => {
    const todo = {
      id: 1,
      title: 'Onenone',
      description: 'Twowowo'
    }

    getById.mockRejectedValue(new Error('Test error!'))

    await todoById({ params: todo.id }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('listArchivedTodos', () => {
  test('should get response', async () => {
    const todo = {
      title: 'Onenone',
      description: 'Twowowo',
      archive: true
    }

    getArchived.mockResolvedValue(todo)

    const url = { page: 1, size: 2 }

    await listArchivedTodos(url, res)

    expect(json).toHaveBeenCalledWith(todo)
  })
  test('should throw error', async () => {
    getArchived.mockRejectedValue(new Error('Test error!'))

    const url = { page: 1, size: 2 }

    await listArchivedTodos(url, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('updateTodos', () => {
  test('should get response', async () => {
    const todo = {
      title: 'Onenone',
      description: 'Twowowo'
    }

    update.mockResolvedValue(todo)

    await updateTodos({ body: todo }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!' })
  })
  test('should throw error', async () => {
    const todo = {
      title: 'Onenone',
      description: 'Twowowo'
    }

    update.mockRejectedValue(new Error('Test error!'))

    await updateTodos({ body: todo }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('archiveTodos', () => {
  test('should get response', async () => {
    const todo = {
      archive: true
    }

    archive.mockResolvedValue(todo)

    await archiveTodos({ body: todo }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!' })
  })
  test('should throw error', async () => {
    const todo = 1
    archive.mockRejectedValue(new Error('Test error!'))

    await archiveTodos({ body: todo }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})

describe('deleteTodo', () => {
  test('should get response', async () => {
    const todo = {
      id: 1,
      title: 'One',
      description: 'oaosdjosad'
    }

    del.mockResolvedValue(todo)

    await deleteTodo({ params: todo.id }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!' })
  })
  test('should throw error', async () => {
    const todo = {
      id: 1,
      title: 'One',
      description: 'oaosdjosad'
    }

    const e = del.mockRejectedValue(new Error('Test error!'))

    await deleteTodo({ params: todo.id }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err', message: 'Test error!' })
  })
})
