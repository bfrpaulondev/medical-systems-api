// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  // Additional fields can be added here
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
