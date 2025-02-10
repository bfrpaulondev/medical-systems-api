const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String },
  feedbackDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
