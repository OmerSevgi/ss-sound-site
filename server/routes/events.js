const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Tüm etkinlikleri getir
router.get('/', eventController.getEvents);

// Yeni etkinlik oluştur
router.post('/', eventController.createEvent);

// Belirli bir etkinliği getir
router.get('/:id', eventController.getEventById);

// Etkinliği güncelle
router.put('/:id', eventController.updateEvent);

// Etkinliği sil
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
