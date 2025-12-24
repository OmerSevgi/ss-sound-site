const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'İsim alanı zorunludur.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'E-posta alanı zorunludur.'],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Geçerli bir e-posta adresi giriniz.',
    ],
  },
  message: {
    type: String,
    required: [true, 'Mesaj alanı zorunludur.'],
  },
  phone: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('ContactMessage', ContactMessageSchema);
