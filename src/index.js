import {createTodo} from './controllers/todo'
import express from 'express'

const app = express()

app.post('/todo', createTodo)


app.get('', (req, res) => {
  res.status(500).send('Hello World!')
})

app.get('/help', (req, res)=>{
  res.send({
    name: 'Hristo',
    age: 21
  })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})
