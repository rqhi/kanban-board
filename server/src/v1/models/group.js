const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  boards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]
});

module.exports = mongoose.model('Group', groupSchema);
