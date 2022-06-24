import { isNil } from 'ramda'
import md5 from 'md5'
import { addSession } from '../models/session.js'
import { findByEmail } from '../models/user.js'

const validateSession = data => {
  const { email, password } = data

  if ([email, password].some(isNil)) {
    return Promise.reject(new Error('Email, password are required!'))
  }

  return Promise.resolve(data)
}

const checkPass = async data => {
  const userData = await findByEmail(data.email)
  const { password } = data
  const hashedPassword = md5(password)
  if (hashedPassword === userData.password) {
    return data
  }
  throw new Error('Password is not equal!')
}

const create = data => validateSession(data).then(checkPass).then(addSession)

export { create }
