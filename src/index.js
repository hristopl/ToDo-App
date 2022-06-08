import express from 'express'
import { createTodo, listTodo, deleteTodo, updateTodo, listArchivedTodo, todoById, archiveTodo } from './controllers/todo.js'

const app = express()
app.use(express.json())

app.post('/todo', createTodo)

app.get('/todo', listTodo)

app.get('/todo/id/:id', todoById)

app.get('/archive', listArchivedTodo)

app.put('/todo', updateTodo)

app.put('/archive', archiveTodo)

app.delete('/todo/:id', deleteTodo)

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
