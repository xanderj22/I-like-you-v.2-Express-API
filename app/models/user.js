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
    required: true,
    maxlength: 13
  },
  location: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true,
    maxlength: 36
  },
  genderIdentity: {
    type: String,
    required: true
  },
  preferredPronoun: {
    type: String,
    required: true
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
