const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/authMiddleware');

// İletişim mesajı oluştur (herkes erişebilir)
router.post('/', contactController.createContactMessage);

// Tüm iletişim mesajlarını getir (sadece admin erişebilir)
router.get('/', protect, authorize('admin'), contactController.getContactMessages);

// Belirli bir iletişim mesajını ID'ye göre getir (sadece admin erişebilir)
router.get('/:id', protect, authorize('admin'), contactController.getContactMessageById);

// Bir iletişim mesajını okunmuş olarak işaretle (sadece admin erişebilir)
router.put('/:id/read', protect, authorize('admin'), contactController.markContactMessageAsRead);

// Bir iletişim mesajını sil (sadece admin erişebilir)
router.delete('/:id', protect, authorize('admin'), contactController.deleteContactMessage);

module.exports = router;
