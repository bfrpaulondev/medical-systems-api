// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String },
  available: { type: Boolean, default: true },
  email: { type: String, unique: true },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
