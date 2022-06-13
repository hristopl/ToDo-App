import express from 'express'
import { createTodos, listTodos, deleteTodo, updateTodos, listArchivedTodos, todoById, archiveTodos } from './controllers/todo.js'

const app = express()
app.use(express.json())

app.post('/todo', createTodos)

app.get('/todo', listTodos)

app.get('/todo/id/:id', todoById)

app.get('/todo/archive', listArchivedTodos)

app.put('/todo', updateTodos)

app.put('/todo/archive', archiveTodos)

app.delete('/todo/:id', deleteTodo)

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
