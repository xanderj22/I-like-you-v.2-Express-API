const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  interests: {
    type: String
  },
  fiveFaves: {
    type: String
  },
  personalityTypes: {
    type: String
  },
  genderPrefs: {
    type: String
  },
  searchingFor: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Like', likeSchema)
