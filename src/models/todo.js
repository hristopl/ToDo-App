import { prop } from 'ramda'
import mongoose from 'mongoose'

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected successfully')
})

const Schema = mongoose.Schema

const toDoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  archive: {
    type: Boolean,
    default: false
  }
})

toDoSchema.index({ archive: 1 })

const Todo = mongoose.model('Todo', toDoSchema)

const convertSingleId = todo => {
  const { _id, ...rest } = todo
  return { ...rest, id: _id }
}
const convertIds = todos => todos.map(convertSingleId)

const add = todo => Todo.create(todo)
  .then(prop('_doc'))
  .then(convertSingleId)

const getTodos = ({ page, size }) =>
  Todo.find({ archive: false })
    .sort({ createdDate: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .then(convertIds)

const getArchivedTodos = ({ page, size }) =>
  Todo.find({ archive: true })
    .sort({ createdDate: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .then(convertIds)

const todoById = (id) => Todo.findById(id).sort({ createdDate: -1 })

const updateTodos = todo => {
  const filter = { _id: todo.id }
  const updated = { $set: { title: todo.title, description: todo.description } }
  return Todo.updateOne(filter, updated)
}
const archiveTodos = (todo) => {
  const filter = { _id: todo.id }
  const updated = { $set: { archive: !todo.archive } }
  return Todo.updateOne(filter, updated)
}
const deleteTodoById = id => Todo.findByIdAndDelete(id)

export {
  add,
  getTodos,
  todoById,
  getArchivedTodos,
  deleteTodoById,
  updateTodos,
  archiveTodos,
  convertSingleId
}
