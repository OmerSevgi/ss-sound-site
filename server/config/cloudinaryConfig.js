const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary yapılandırması
// Render'da ayarlanan CLOUDINARY_URL ortam değişkenini otomatik olarak kullanır
cloudinary.config();

// Multer için Cloudinary depolama motorunu ayarla
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ss-sound-uploads', // Cloudinary'de resimlerin depolanacağı klasör
    allowed_formats: ['jpeg', 'png', 'jpg', 'gif', 'webp'],
  },
});

const uploadParser = multer({ storage: storage });

module.exports = uploadParser;
