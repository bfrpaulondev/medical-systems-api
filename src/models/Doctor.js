const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  specialization: { type: String, required: true },
  email:     { type: String },
  phone:     { type: String },
  office:    { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);
