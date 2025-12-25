const express = require('express');
const router = express.Router();
const uploadParser = require('../config/cloudinaryConfig');

// Dosya yükleme endpoint'i
// 'media' alan adıyla birden fazla dosya kabul edecek ve Cloudinary'e yükleyecek
router.post('/', uploadParser.array('media', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'Lütfen en az bir dosya seçin.' });
  }

  // Cloudinary'den dönen URL'leri toplayıp istemciye gönderelim.
  // Not: Kütüphane versiyonuna göre URL 'secure_url', 'url' veya 'path' içinde olabilir.
  const urls = req.files.map(file => file.secure_url || file.url);
  
  res.status(200).json({ 
    message: 'Dosyalar başarıyla Cloudinary\'e yüklendi.',
    urls: urls 
  });
});

module.exports = router;
