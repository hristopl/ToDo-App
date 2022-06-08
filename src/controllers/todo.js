import { create, get, del, update, getArchived, getById, archive } from '../services/todo.js'

const createTodo = (req, res) => {
  const todo = req.body
  create(todo)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listTodo = (req, res) => {
  get()
    .then((todos) => res.send(todos))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const todoById = (req, res) => {
  const id = req.params.id
  getById(id)
    .then((todo) => res.status(200).send(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listArchivedTodo = (req, res) => {
  getArchived()
    .then((todo) => res.send(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const updateTodo = (req, res) => {
  update(req.body)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const archiveTodo = (req, res) => {
  archive(req.body)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const deleteTodo = (req, res) => {
  const todo = req.params.id
  del(todo)
    .then(res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).send(e))
}

export {
  createTodo,
  listTodo,
  todoById,
  listArchivedTodo,
  updateTodo,
  deleteTodo,
  archiveTodo
}
