import mongoose from 'mongoose'

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
  console.log('Connected successfully')
})

const Collection = db.collection('sessions')

Collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 })

const Schema = mongoose.Schema

const sessionSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  }
})

const Session = mongoose.model('Session', sessionSchema)

const addSession = data => Session.create(data).then((result) => ({ sessionId: result.id }))

const findSessionById = id => Session.findById(id)

export { addSession, findSessionById }
