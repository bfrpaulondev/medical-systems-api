const mongoose = require('mongoose');

const ImagingResultSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  imagingType: { type: String, required: true },
  imageUrl:  { type: String },
  result:    { type: String },
  imagingDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ImagingResult', ImagingResultSchema);
