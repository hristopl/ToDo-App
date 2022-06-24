import { findSessionById } from '../models/session.js'

const authenticate = sessionId => findSessionById(sessionId)

export { authenticate }
