import { isNil } from 'ramda'
import md5 from 'md5'
import { addSession } from '../models/session.js'
import { findByEmail } from '../models/user.js'

const validateSession = auth => {
  const { email, password } = auth

  if ([email, password].some(isNil)) {
    return Promise.reject(new Error('Email, password are required!'))
  }

  return Promise.resolve(auth)
}

const checkPass = async auth => {
  const userData = await findByEmail(auth.email)
  const { password } = auth
  const hashedPassword = md5(password)
  if (hashedPassword === userData.password) {
    return auth
  }
  throw new Error('Password doesn\'t match!')
}

const create = data => validateSession(data).then(checkPass).then(addSession)

export { validateSession, checkPass, create }
