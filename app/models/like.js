const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  interests: {
    type: String,
    required: true
  },
  fiveFaves: {
    type: String,
    required: true
  },
  personalityTypes: {
    type: String,
    required: true
  },
  genderPrefs: {
    type: String,
    required: true
  },
  searchingFor: {
    type: String,
    required: true
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
