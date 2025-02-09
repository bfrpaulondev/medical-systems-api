// models/Branch.js
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
