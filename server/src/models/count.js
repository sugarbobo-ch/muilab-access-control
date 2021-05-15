const mongoose = require('mongoose')

const countSchema = new mongoose.Schema({
  doorId: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

const count = mongoose.model('Count', countSchema, 'Count')
module.exports = count
