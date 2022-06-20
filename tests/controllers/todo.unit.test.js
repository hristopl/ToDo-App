import { createTodos, listTodos, todoById, listArchivedTodos, updateTodos, deleteTodo, archiveTodos } from '../../src/controllers/todo'
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

describe.skip('createTodos', () => {
  test('should get response', () => {
    createTodos({
      body: {
        title: 'Go to gym',
        description: 'go to training'
      }
    }, res)

    expect(json).toHaveBeenCalledWith({ status: 'Ok!' })
  })
  test('should throw error', () => {
    createTodos({
      body: {
        title: 123,
        description: 1234
      }
    }, res)

    expect(status).toHaveBeenCalledWith(500)
    expect(json).toHaveBeenCalledWith({ status: 'err' })
  })
})

describe.skip('listTodos', () => {
  test('should get response', () => {
    const req = {
      query: {
        title: 'One',
        description: 'Oneneoneoene'
      }
    }

    listTodos(req, res)

    expect(send).toHaveBeenCalledWith(req)
  })
})
