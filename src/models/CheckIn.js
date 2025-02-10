const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date },
  status: { type: String, enum: ['CheckedIn', 'CheckedOut'], default: 'CheckedIn' }
}, { timestamps: true });

module.exports = mongoose.model('CheckIn', CheckInSchema);
