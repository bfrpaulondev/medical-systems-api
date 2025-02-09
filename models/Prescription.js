// models/Prescription.js
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medications: [{ type: String }],
  instructions: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
