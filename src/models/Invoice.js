const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  amount:    { type: Number, required: true },
  status:    { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  invoiceDate: { type: Date, default: Date.now },
  dueDate:   { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
