const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teamLeaders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Group', GroupSchema);
