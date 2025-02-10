const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  dob:       { type: Date, required: true },
  gender:    { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address:   { type: String },
  contactNumber: { type: String },
  email:     { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
