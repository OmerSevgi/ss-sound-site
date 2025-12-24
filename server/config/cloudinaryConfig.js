const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary yapılandırması
// CLOUDINARY_URL ortam değişkenini açıkça kullanarak yapılandır
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

// Multer için Cloudinary depolama motorunu ayarla
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ss-sound-uploads', // Cloudinary'de resimlerin depolanacağı klasör

  },
});

const uploadParser = multer({ storage: storage });

module.exports = uploadParser;
