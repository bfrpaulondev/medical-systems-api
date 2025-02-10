const mongoose = require('mongoose');

const InventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  expiryDate: { type: Date },
  supplier: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('InventoryItem', InventoryItemSchema);
