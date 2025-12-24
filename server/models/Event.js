const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Etkinlik adı zorunludur'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Etkinlik açıklaması zorunludur'],
  },
  date: {
    type: Date,
    required: [true, 'Etkinlik tarihi zorunludur'],
  },
  location: {
    type: String,
    required: [true, 'Etkinlik konumu zorunludur'],
    trim: true,
  },
  imageUrls: {
    type: [String],
    default: [],
  },
  videoUrls: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ['Düğün', 'Konser', 'Festival', 'Kurumsal', 'Özel Parti', 'Diğer'],
    default: 'Diğer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
