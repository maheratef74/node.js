const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  categoryId: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
