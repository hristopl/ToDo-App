import mongoose from 'mongoose'

const db = mongoose.connection

const Collection = db.collection('sessions')

Collection.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 30 })

const Schema = mongoose.Schema

const sessionSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

const Session = mongoose.model('Session', sessionSchema)

const addSession = data => Session.create(data).then((result) => ({ sessionId: result.id }))

const findSessionById = id => Session.findById(id).lean()

const refreshSession = async session => {
  const filter = { _id: session._id }
  const updated = { $set: { createdAt: Date.now() } }

  await Session.updateOne(filter, updated)

  return session
}

export { addSession, findSessionById, refreshSession }
