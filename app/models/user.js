const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    maxlength: 13
  },
  location: {
    type: String
  },
  about: {
    type: String,
    maxlength: 36
  },
  genderIdentity: {
    type: String
  },
  preferredPronoun: {
    type: String
  },
  like: { type: mongoose.Schema.Types.ObjectId, ref: 'Like'
  },
  token: String
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)
