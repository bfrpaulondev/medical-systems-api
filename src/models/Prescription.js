const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patientId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medication: { type: String, required: true },
  dosage:     { type: String, required: true },
  instructions: { type: String },
  prescribedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', PrescriptionSchema);
