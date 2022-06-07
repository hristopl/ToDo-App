import { isNil } from 'ramda';
import {add,getTodo,deleteTodoById,updateTodo,getArchivedTodo,getTodoById,archiveTodo} from '../models/todo.js'
 
const validateTodo = todo => {
  const {title, description} = todo
  if ([title, description].some(isNil)) {
    return Promise.reject(new Error('Title or description is Nil!'))
  }

  return Promise.resolve(todo)
}

const create = async todo => {
  const validTodo = await validateTodo(todo)
  return add(validTodo)
}

// const update = async todo => {
//   const validTodo = await validateTodo(todo)
//   return updateTodo(validTodo)
// }

const update = todo => validateTodo(todo).then(updateTodo)
const archive = todo => validateTodo(todo).then(archiveTodo)

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
