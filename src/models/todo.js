import { prop } from 'ramda'
import mongoose from 'mongoose'

// const db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error: '))
// db.once('open', () => {
//   console.log('Connected successfully')
// })

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
  },
  email: {
    type: String,
    required: true
  }
})

toDoSchema.index({ email: 1, archive: 1 })

const Todo = mongoose.model('Todo', toDoSchema)

const convertSingleId = todo => {
  const { _id, ...rest } = todo
  return { ...rest, id: _id }
}
const convertIds = todos => todos.map(convertSingleId)

const add = email => todo => Todo.create({ ...todo, email })
  .then(prop('_doc'))
  .then(convertSingleId)

const getTodos = email => ({ page, size }) =>
  Todo.find({ email, archive: false })
    .sort({ createdDate: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .then(convertIds)

const getArchivedTodos = email => ({ page, size }) =>
  Todo.find({ email, archive: true })
    .sort({ createdDate: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .lean()
    .then(convertIds)

const todoById = (id, email) => Todo.findOne({ _id: id, email }).lean()

const updateTodos = email => todo => {
  const filter = { _id: todo.id, email }
  const updated = { $set: { title: todo.title, description: todo.description } }
  return Todo.updateOne(filter, updated)
}
const archiveTodos = async (id, email) => {
  const todo = await todoById(id, email)
  const filter = { _id: id, email }
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
