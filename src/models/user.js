import mongoose from 'mongoose'

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected successfully')
})

const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

const addUser = user => {
  const { email, ...rest } = user
  return User.create({ ...rest, _id: email })
}

const findByEmail = email => User.findById(email).lean()

export { addUser, findByEmail }
