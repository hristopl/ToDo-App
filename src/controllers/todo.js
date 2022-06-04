import {create,get,del,update,getArchived,getById,archive,getArchivedById} from '../services/todo.js'

const createTodo = (req, res) => {
  const todo = req.body
  create(todo)
    .then(() => res.json({status: 'Ok!'}))
    .catch(e => res.status(500).json({status: 'err', message: e.message}))
}

const listTodo = (req, res) => {
  get()
  .then((todo) => res.send(todo))
  .catch(e => res.status(500).json({status: 'err', message: e.message}))
}

const listTodoById = (req,res) => {
  const todo = req.params.id
  getById(todo)
  .then((todo) => res.status(200).send(todo))
  .catch(e => res.status(500).json({status:'err', message: e.message}))
}

const listArchivedTodo = (req, res) => {
  getArchived()
  .then((todo)=>res.send(todo))
  .catch(e => res.status(500).json({status: 'err', message: e.message}))
}

const updateTodo = (req,res) => {
  const todo = req.body.id
  const updated = {$set: {title: req.body.title, description: req.body.description}}
  update(todo,updated)
  .then(() => res.json({status: 'Ok!'}))
  .catch(e => res.status(500).json({status: 'err', message: e.message}))
}

const archiveTodo = (req,res) => {
  const todo = req.body.id
  const updated = {$set: {archive:req.body.archive}}
  archive(todo,updated)
  .then(()=>res.json({status:'Ok!'}))
  .catch(e=>res.status(500).json({status:'err', message:e.message}))
}

const deleteTodo = (req,res) => {
  const todo = req.params.id
  del(todo)
  .then(res.json({status: 'Ok!'}))
  .catch(e => res.status(500).send(e))
}


export {
  createTodo,
  listTodo,
  listTodoById,
  listArchivedTodo,
  updateTodo,
  deleteTodo,
  archiveTodo
} 
