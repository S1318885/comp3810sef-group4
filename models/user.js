const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true, sparse: true }
  
}, { collection: '3810SEFDB' });

module.exports = mongoose.model('User', userSchema);