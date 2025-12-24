const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Resim URL\'si zorunludur'],
  },
  caption: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);

module.exports = GalleryImage;
