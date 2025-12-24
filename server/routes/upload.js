const express = require('express');
const router = express.Router();
const uploadParser = require('../config/cloudinaryConfig');

// Dosya yükleme endpoint'i
// 'media' alan adıyla birden fazla dosya kabul edecek ve Cloudinary'e yükleyecek
router.post('/', uploadParser.array('media', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Lütfen en az bir dosya seçin.' });
  }

  // Cloudinary, yüklenen dosyaların URL'lerini 'req.files' içinde 'path' olarak döndürür.
  // Bu URL'leri toplayıp istemciye gönderelim.
  const urls = req.files.map(file => file.path);
  
  res.status(200).json({ 
    message: 'Dosyalar başarıyla Cloudinary\'e yüklendi.',
    urls: urls 
  });
});

module.exports = router;
