import { isNil } from 'ramda';
import {add,getTodo,deleteTodoById,updateTodo,getArchivedTodo,getTodoById,archiveTodo,getArchivedTodoById} from '../models/todo.js'
 
const validateTodo = todo => {
  const {title, description} = todo
  if ([title, description].some(isNil)) {
    return ['Title or discription is Nil!']
  }

  return []
}
const create = todo => {
  const errors = validateTodo(todo)

  if (errors.length > 0) {
    return Promise.reject(new Error(errors.join(' ')))
  }

  return add(todo)
}

const update = (todo, updated) => updateTodo(todo,updated)
const archive = (todo,updated) => archiveTodo(todo,updated)

const get = getTodo
const getById  = todo => getTodoById(todo)
const getArchived = getArchivedTodo

const del = id => deleteTodoById(id)



export {
  create,
  get,
  getById,
  getArchived,
  del,
  update,
  archive,
}
