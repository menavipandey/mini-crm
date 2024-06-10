// server/models/Campaign.js
const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  audienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audience', required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' }
});

module.exports = mongoose.model('Campaign', campaignSchema);
