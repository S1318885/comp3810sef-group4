const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 1, maxlength: 100 },
  description: { type: String },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { collection: '3810SEFDB' });

module.exports = mongoose.model('Task', taskSchema);