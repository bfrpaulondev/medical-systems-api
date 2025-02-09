// models/Billing.js
const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['paid', 'pending', 'overdue'], default: 'pending' },
  invoiceNumber: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Billing', billingSchema);
