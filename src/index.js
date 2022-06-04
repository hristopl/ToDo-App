import express from 'express'
import { createTodo, listTodo, deleteTodo, updateTodo, listArchivedTodo,listTodoById,archiveTodo} from './controllers/todo.js'

const app = express()

app.use(express.json())

app.post('/todo',createTodo)

app.get('/todo', listTodo)

app.get('/todo/id/:id',listTodoById)

app.get('/todo/archive', listArchivedTodo)

app.put('/todo', updateTodo)

app.put('/todo/archive',archiveTodo)

app.delete('/todo/:id', deleteTodo)

// app.get('', (req, res) => {
//   res.status(500).send('Hello World!')
// })

// app.get('/help', (req, res)=>{
//   res.send({
//     name: 'Hristo',
//     age: 21
//   })
// })

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})
