import { create } from '../services/session.js'

const createSession = (req, res) => {
  const auth = req.body

  return create(auth)
    .then((data) => res.json({ status: 'Ok!', data }))
    .catch(e => res.status(500).json({ status: 'err', message: e.message }))
}

export { createSession }
