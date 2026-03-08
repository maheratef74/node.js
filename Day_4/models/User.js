const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
