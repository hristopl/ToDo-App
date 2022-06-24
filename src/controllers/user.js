import { create, listUserByEmail } from '../services/user.js'

const createUser = (req, res) => {
  const user = req.body
  return create(user)
    .then(() => { res.json({ status: 'Ok!' }) })
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

const listUser = (req, res) => {
  const email = req.params.id
  return listUserByEmail(email)
    .then((user) => res.json(user))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

export { createUser, listUser }
