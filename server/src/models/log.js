const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  doorId: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const log = mongoose.model('Log', logSchema, 'Logs')
module.exports = log
