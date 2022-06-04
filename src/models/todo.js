import mongoose from 'mongoose'
import { update } from 'ramda';
mongoose.connect('mongodb://127.0.0.1:27017/todoApp', {
  useNewUrlParser: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});


const Schema = mongoose.Schema

const toDoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description : {
    type: String,
    required: true
  }, 
  createdDate: {
    type : Date,
    default : Date.now()
  },
  archive: {
    type: Boolean,
    default: false
  }
})

const _id = toDoSchema.path('_id')

toDoSchema.index({archive:1})

const Todo = mongoose.model('Todo',toDoSchema)

const add = todo =>Todo.create(todo)
const getTodo = () => Todo.find({archive: false})
const getTodoById = (id) => Todo.findById(id)
const getArchivedTodo = () => Todo.find({archive: true})
const updateTodo = (todo, updated) => Todo.updateOne(todo,updated)
const archiveTodo = (todo, updated) => Todo.updateOne(todo,updated)
const deleteTodoById = id => Todo.findByIdAndDelete(id) 


export {
  add,
  getTodo,
  getTodoById,
  getArchivedTodo,
  deleteTodoById,
  updateTodo,
  archiveTodo
}
