import { create, get, del, update, getArchived, getById, archive } from '../services/todo.js'

const createTodos = (req, res) => {
  const todo = req.body
  create(todo)
    .then((todo) => res.json({ status: 'Ok!', todo }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listTodos = (req, res) => {
  const url = req.query
  get(url)
    .then((todos) => res.send(todos))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const todoById = (req, res) => {
  const id = req.params.id
  getById(id)
    .then((todo) => res.status(200).send(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listArchivedTodos = (req, res) => {
  getArchived()
    .then((todo) => res.send(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const updateTodos = (req, res) => {
  update(req.body)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const archiveTodos = (req, res) => {
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
  createTodos,
  listTodos,
  todoById,
  listArchivedTodos,
  updateTodos,
  deleteTodo,
  archiveTodos
}
