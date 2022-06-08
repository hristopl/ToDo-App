import { isNil } from 'ramda'
import { add, getTodos, deleteTodoById, updateTodos, getArchivedTodos, todoById, archiveTodos } from '../models/todo.js'

const validateTodo = todo => {
  const { title, description } = todo
  if ([title, description].some(isNil)) {
    return Promise.reject(new Error('Title or description is Nil!'))
  }

  return Promise.resolve(todo)
}

const create = async todo => {
  const validTodo = await validateTodo(todo)
  return add(validTodo)
}

const update = todo => validateTodo(todo).then(updateTodos)
const archive = todo => archiveTodos(todo)
const get = getTodos
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
  archive
}
