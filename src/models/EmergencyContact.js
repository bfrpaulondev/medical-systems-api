const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  name: { type: String, required: true },
  relation: { type: String },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyContact', EmergencyContactSchema);
