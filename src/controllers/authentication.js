import { authenticate } from '../services/authentication.js'

const auth = (req, res, next) => {
  const sessionId = req.query.sessionId

  return authenticate(sessionId)
    .catch(e => res.status(401).json({ status: 'err', message: e.message }))
    .then(email => {
      res.locals.email = email
      next()
    })
}

export { auth }
