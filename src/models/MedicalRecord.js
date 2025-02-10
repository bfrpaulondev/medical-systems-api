const mongoose = require('mongoose');

const MedicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diagnosis: { type: String },
  treatment: { type: String },
  notes:     { type: String },
  recordDate:{ type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);
