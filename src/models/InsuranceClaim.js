const mongoose = require('mongoose');

const InsuranceClaimSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  insuranceProvider: { type: String, required: true },
  claimAmount: { type: Number, required: true },
  status: { type: String, enum: ['Submitted', 'Approved', 'Denied'], default: 'Submitted' },
  claimDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('InsuranceClaim', InsuranceClaimSchema);
