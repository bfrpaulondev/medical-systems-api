// models/Laboratory.js
const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testType: { type: String },
  result: { type: String },
  date: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Laboratory', laboratorySchema);
