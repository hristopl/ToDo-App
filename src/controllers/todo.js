import {create} from '../services/todo'

const creatTodo = (req, res) => {
  const todo = req.body
  create(todo)
    .then(() => res.json({status: 'ok'}))
    .catch(e => res.status(500).json({status: 'err', message: e.message}))
}

export {
  createTodo
}
