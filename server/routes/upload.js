const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Yüklenecek dosyalar için depolama ayarlarını yapılandır
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/uploads/';
    // Eğer dizin yoksa oluştur
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const sanitizedName = originalName
      .replace(extension, '') // Uzantıyı geçici olarak kaldır
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u017F]/g, '-') // Harf ve rakam olmayanları tire ile değiştir (Türkçe karakterleri koru)
      .replace(/-+/g, '-') // Çoklu tireleri tek tire yap
      .replace(/^-+|-+$/g, ''); // Başta ve sondaki tireleri kaldır
    
    cb(null, Date.now() + '-' + sanitizedName + extension);
  }
});

// Multer'ı yapılandır
const upload = multer({ storage: storage });

// Dosya yükleme endpoint'i
// 'media' alan adıyla birden fazla dosya kabul edecek şekilde ayarlandı
router.post('/', upload.array('media', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Lütfen en az bir dosya seçin.' });
  }

  // Yüklenen dosyaların yollarını istemciye gönder
  const filePaths = req.files.map(file => `/uploads/${file.filename}`);
  
  res.status(200).json({ 
    message: 'Dosyalar başarıyla yüklendi.',
    urls: filePaths 
  });
});

module.exports = router;
