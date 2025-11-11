const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  googleId: String,
  facebookId: String,
  displayName: String,
});

module.exports = mongoose.model('User', userSchema);
