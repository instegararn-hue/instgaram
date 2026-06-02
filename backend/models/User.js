const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email:    { type: String },
  fullName: { type: String },
  username: { type: String },
  password: { type: String },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
