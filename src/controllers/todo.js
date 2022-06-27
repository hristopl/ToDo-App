import { create, get, del, update, getArchived, getById, archive } from '../services/todo.js'

const createTodos = (req, res) => {
  const todo = req.body
  const email = res.locals.email

  return create(todo, email)
    .then((todo) => res.json({ status: 'Ok!', email, ...todo }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listTodos = (req, res) => {
  const url = req.query
  const email = res.locals.email
  return get(url, email)
    .then((todos) => res.json(todos))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const todoById = (req, res) => {
  const id = req.params.id
  return getById(id)
    .then((todo) => res.json(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listArchivedTodos = (req, res) => {
  const url = req.query
  const email = res.locals.email
  return getArchived(url, email)
    .then((todo) => res.json(todo))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const updateTodos = (req, res) => {
  const todo = req.body
  const email = res.locals.email
  return update(todo, email)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const archiveTodos = (req, res) => {
  const todo = req.body
  const email = res.locals.email
  return archive(todo, email)
    .then(() => res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const deleteTodo = (req, res) => {
  const todo = req.params.id
  return del(todo)
    .then(res.json({ status: 'Ok!' }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
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
