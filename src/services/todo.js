import { isNil } from 'ramda'
import { add, getTodos, deleteTodoById, updateTodos, getArchivedTodos, todoById, archiveTodos } from '../models/todo.js'

const validate = todo => {
  const { title, description } = todo
  if ([title, description].some(isNil)) {
    return Promise.reject(new Error('Title or description is Nil!'))
  }

  return Promise.resolve(todo)
}

const isPositiveNumber = number => isNaN(number) && number > 0

const validatePageAndSize = (page, size) =>
  [page, size].some(isPositiveNumber)
    ? Promise.resolve(page, size)
    : Promise.reject(new Error('Page or size is not a number!'))

const create = todo => validate(todo).then(add)

const update = todo => validate(todo).then(updateTodos)
const archive = todo => archiveTodos(todo)
const get = (url) => {
  const { page = 1, size = 5 } = url
  return validatePageAndSize(page, size).then(getTodos)
}

const getById = todo => todoById(todo)
const getArchived = getArchivedTodos

const del = id => deleteTodoById(id)

export {
  create,
  get,
  getById,
  getArchived,
  del,
  update,
  archive,
  isPositiveNumber
}
