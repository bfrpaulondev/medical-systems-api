const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  role: { type: String, enum: ['Doctor', 'Nurse', 'Receptionist', 'Admin'], required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Staff', StaffSchema);
