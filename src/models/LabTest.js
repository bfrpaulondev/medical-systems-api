const mongoose = require('mongoose');

const LabTestSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  testType:  { type: String, required: true },
  result:    { type: String },
  testDate:  { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('LabTest', LabTestSchema);
