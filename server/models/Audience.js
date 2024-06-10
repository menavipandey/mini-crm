// server/models/Audience.js
const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
  rules: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Audience', audienceSchema);
