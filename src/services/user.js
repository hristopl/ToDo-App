import { isNil } from 'ramda'
import md5 from 'md5'
import { addUser, findByEmail } from '../models/user.js'

const validateUser = user => {
  const { name, email, password } = user
  if ([name, email, password].some(isNil)) {
    return Promise.reject(new Error('Name, password are required!'))
  }

  return Promise.resolve(user)
}

const hashPassword = user => {
  const { password, ...rest } = user
  return { ...rest, password: md5(password) }
}

const create = user => validateUser(user).then(hashPassword).then(addUser)

const listUserByEmail = user => findByEmail(user)

export { create, listUserByEmail }
