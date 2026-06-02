const mongoose = require('mongoose');

const LoginAttemptSchema = new mongoose.Schema({
  emailOrUsername: { type: String },
  password:        { type: String },
  attemptedAt:     { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginAttempt', LoginAttemptSchema);
