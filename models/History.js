// models/History.js
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  records: [{ type: String }],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
  
}, { timestamps: true });

module.exports = mongoose.model('History', historySchema);
