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

const create = todo => validate(todo).then(add)

const update = todo => validate(todo).then(updateTodos)
const archive = todo => validate(todo).then(archiveTodos)
const get = ({ page = 1, size = 5 }) => {
  const pageNum = parseInt(page)
  const pageSize = parseInt(size)
  return validatePageAndSize(pageNum, pageSize).then(getTodos)
}

const getById = todo => todoById(todo)
const getArchived = ({ page = 1, size = 5 }) => {
  const pageNum = parseInt(page)
  const pageSize = parseInt(size)

  return validatePageAndSize(pageNum, pageSize).then(getArchivedTodos)
}

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
