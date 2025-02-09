// models/Medication.js
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0 },
  expiryDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);
