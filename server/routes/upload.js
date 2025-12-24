const express = require('express');
const router = express.Router();
// const uploadParser = require('../config/cloudinaryConfig'); // Hata ayıklama için geçici olarak devre dışı bırakıldı

// Dosya yükleme endpoint'i
router.post('/', (req, res) => {
  // Middleware'i kaldırdığımız için req.files tanımsız olacaktır.
  // Bu kodun amacı sadece isteğin bu noktaya ulaşıp ulaşmadığını test etmektir.
  console.log('UPLOAD ROUTE HAS BEEN HIT - YUKLEME ADRESINE ULASILDI');
  
  res.status(500).json({ 
    message: 'Hata ayıklama aktif, dosya ayrıştırıcı devre dışı.'
  });
});

module.exports = router;
