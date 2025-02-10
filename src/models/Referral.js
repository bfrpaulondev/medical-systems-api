const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  referringDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  referredDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  reason: { type: String },
  referralDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Referral', ReferralSchema);
