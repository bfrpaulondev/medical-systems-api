// models/Dashboard.js
const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  metrics: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);
