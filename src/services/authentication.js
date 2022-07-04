import { findSessionById, refreshSession } from '../models/session.js'

const authenticate = sessionId => findSessionById(sessionId).then(refreshSession)

export { authenticate }
