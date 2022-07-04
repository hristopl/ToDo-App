import express from 'express'
import mongoose from 'mongoose'
import { createSession } from './controllers/session.js'
import { createTodos, listTodos, deleteTodo, updateTodos, listArchivedTodos, todoById, archiveTodos } from './controllers/todo.js'
import { createUser, listUser } from './controllers/user.js'
import { auth } from './controllers/authentication.js'

const app = express()
app.use(express.json())

app.post('/todo', [auth], createTodos)

app.post('/register', createUser)

app.post('/login', createSession)

app.get('/users/id/:id', [auth], listUser)

app.get('/todo', [auth], listTodos, createSession)

app.get('/todo/id/:id', [auth], todoById)

app.get('/todo/archive', [auth], listArchivedTodos)

app.put('/todo', [auth], updateTodos)

app.get('/todo/archive/:id', [auth], archiveTodos)

app.delete('/todo/:id', [auth], deleteTodo)

mongoose.connect('mongodb://127.0.0.1:27017/todoApp', { useNewUrlParser: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is up on port 3000.')
    })
  })
