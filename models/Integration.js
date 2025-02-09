// models/Integration.js
const mongoose = require('mongoose');

const integrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  config: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Integration', integrationSchema);
