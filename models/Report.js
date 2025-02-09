// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String },
  data: { type: Object },
  generatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
