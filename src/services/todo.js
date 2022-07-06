import { isNil } from 'ramda'
import { add, getTodos, deleteTodoById, updateTodos, getArchivedTodos, todoById, archiveTodos } from '../models/todo.js'

const isPositiveNumber = number => number > 0

const validate = todo => {
  const { title, description } = todo
  if ([title, description].some(isNil)) {
    return Promise.reject(new Error('Title or description is Nil!'))
  }

  return Promise.resolve(todo)
}

const validatePageAndSize = (page, size) => {
  if ([page, size].every(isPositiveNumber)) {
    return Promise.resolve({ page, size })
  }
  return Promise.reject(new Error('Page or size is not valid!'))
}

const create = (todo, email) => validate(todo).then(add(email))

const update = (todo, email) => validate(todo).then(updateTodos(email))

const archive = (id, email) => archiveTodos(id, email)

const getFn = fn => ({ page = 1, size = 5 }, email) => {
  const pageNum = parseInt(page)
  const pageSize = parseInt(size)
  return validatePageAndSize(pageNum, pageSize).then(fn(email))
}

const get = getFn(getTodos)

const getArchived = getFn(getArchivedTodos)

const getById = (todo, email) => todoById(todo, email)

const del = id => deleteTodoById(id)

export {
  create,
  get,
  getById,
  getArchived,
  del,
  update,
  archive,
  validate,
  isPositiveNumber,
  validatePageAndSize
}
