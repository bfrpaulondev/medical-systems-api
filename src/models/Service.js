const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
