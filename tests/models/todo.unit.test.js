import mongoose from 'mongoose'
import { getTodos, add, getArchivedTodos, todoById, updateTodos, archiveTodos, deleteTodoById, convertSingleId } from '../../src/models/todo'
import { describe, expect, test } from '@jest/globals'

jest.mock('mongoose', () => ({
  todoModel: {
    create: jest.fn().mockReturnThis(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    then: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    updateOne: jest.fn().mockReturnThis(),
    findByIdAndDelete: jest.fn().mockReturnThis()
  },
  model: function () { return this.todoModel },
  connect: jest.fn(),
  Schema: function () { return { index: jest.fn() } }
}))

describe('add', () => {
  test('should create todo', () => {
    const Todo = mongoose.model()

    const email = 'hristo@gmail.com'
    const todo = {
      title: 123,
      description: 1234
    }

    add(email)(todo)

    expect(Todo.create).toHaveBeenCalledWith({ ...todo, email })
    expect(Todo.then).toHaveBeenCalled()
    expect(Todo.then).toHaveBeenCalled()
  })
})

describe('getTodos', () => {
  test('should get todos', () => {
    const Todo = mongoose.model()

    const email = 'hristo@gmail.com'

    getTodos(email)({ page: 1, size: 5 })

    expect(Todo.find).toHaveBeenCalledWith({ email, archive: false })
    expect(Todo.sort).toHaveBeenCalledWith({ createdDate: -1 })
    expect(Todo.skip).toHaveBeenCalledWith(0)
    expect(Todo.limit).toHaveBeenCalledWith(5)
    expect(Todo.lean).toHaveBeenCalled()
    expect(Todo.then).toHaveBeenCalled()
  })
})

describe('getArchivedTodos', () => {
  const Todo = mongoose.model()

  const email = 'hristo@gmail.com'

  getArchivedTodos(email)({ page: 1, size: 5 })

  expect(Todo.find).toHaveBeenCalledWith({ email, archive: true })
  expect(Todo.sort).toHaveBeenCalledWith({ createdDate: -1 })
  expect(Todo.skip).toHaveBeenCalledWith(0)
  expect(Todo.limit).toHaveBeenCalledWith(5)
  expect(Todo.lean).toHaveBeenCalled()
  expect(Todo.then).toHaveBeenCalled()
})

describe('todoById', () => {
  test('should get todo by Id', () => {
    const Todo = mongoose.model()

    const id = '65as3a2sda65s2d0'
    const email = 'hristo@gmail.com'

    todoById(id, email)

    expect(Todo.findOne).toHaveBeenCalledWith({ _id: id, email })
  })
})

describe('updateTodos', () => {
  test('should update todo', () => {
    const Todo = mongoose.model()

    const todo = {
      id: '651265as6516sa',
      title: 'Go to cinema',
      description: 'Go to watch movie',
      email: 'hristo@gmail.com'
    }
    const { email } = todo

    const filter = { _id: todo.id, email }
    const updated = { $set: { title: todo.title, description: todo.description } }

    updateTodos(email)(todo)

    expect(Todo.updateOne).toHaveBeenCalledWith(filter, updated)
  })
})

describe('archiveTodos', () => {
  test('should archive todos', async () => {
    const Todo = mongoose.model()

    const todo = {
      id: '6125a6s56182',
      email: 'hristo@gmail.com',
      archive: true
    }

    Todo.findOne.mockReturnValue({ lean: () => Promise.resolve(todo) })
    Todo.updateOne.mockResolvedValue({})

    const { id, email, archive } = todo

    const filter = { _id: id, email }
    const updated = { $set: { archive: !archive } }

    await archiveTodos(id, email)

    expect(Todo.updateOne).toHaveBeenCalledWith(filter, updated)
  })
})

describe('deleteTodoById', () => {
  test('should delete todo', () => {
    const Todo = mongoose.model()

    const id = '616256126asd650'

    deleteTodoById(id)

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(id)
  })
})

describe('convertSingleId', () => {
  test('should convert id', () => {
    const todo = {
      _id: '56a4sd654asd0',
      title: 'Go to cinema',
      description: 'Go to watch movie'
    }

    const result = convertSingleId(todo)

    expect(result).toEqual({ title: 'Go to cinema', description: 'Go to watch movie', id: '56a4sd654asd0' })
  })
})
