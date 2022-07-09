import { authenticate } from '../services/authentication.js'

const auth = (req, res, next) => {
  const sessionId = req.query.sessionId
  return authenticate(sessionId)
    .then(session => {
      if (session !== null) {
        res.locals.email = session.email
        next()
      } else {
        throw new Error('User not authenticated!')
      }
    })
    .catch(e => res.status(401).json({ status: 'err', message: e.message }))
}

export { auth }
