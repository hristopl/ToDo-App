import express from 'express'
import mongoose from 'mongoose'
import { createSession } from './controllers/session.js'
import { createTodos, listTodos, deleteTodo, updateTodos, listArchivedTodos, todoById, archiveTodos } from './controllers/todo.js'
import { createUser, listUser } from './controllers/user.js'

const app = express()
app.use(express.json())

app.post('/todo', createTodos)

app.post('/register', createUser)

app.post('/login', createSession)

app.get('/users/id/:id', listUser)

app.get('/todo', listTodos)

app.get('/todo/id/:id', todoById)

app.get('/todo/archive', listArchivedTodos)

app.put('/todo', updateTodos)

app.put('/todo/archive', archiveTodos)

app.delete('/todo/:id', deleteTodo)

mongoose.connect('mongodb://127.0.0.1:27017/todoApp', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is up on port 3000.')
    })
  })
