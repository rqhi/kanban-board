const mongoose = require('mongoose')
const { schemaOptions } = require('./modelOptions')

const userSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ['Administrator', 'Teamleader', 'Member'], 
    required: true 
  },
  groupId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Group' 
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, schemaOptions)

module.exports = mongoose.model('User', userSchema)