import { prop } from 'ramda'
import mongoose from 'mongoose'
mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
  useNewUrlParser: true
})

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

const getTodos = () => Todo.find({ archive: false }).lean().sort({ createdDate: -1 })
  .then(convertIds)

const todoById = (id) => Todo.findById(id).sort({ createdDate: -1 })

const getArchivedTodos = () => Todo.find({ archive: true }).lean().sort({ createdDate: -1 })
  .then(convertIds)

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
  archiveTodos
}
