const mongoose = require('mongoose');

const migrationModel = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Migration = mongoose.model('Migration', migrationModel);

module.exports = Migration;