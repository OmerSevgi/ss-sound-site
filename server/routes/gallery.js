const express = require('express');
const router = express.Router();
const {
  getImages,
  addImage,
  deleteImage,
} = require('../controllers/galleryController');
const { protect } = require('../middleware/authMiddleware');

// Herkesin erişebileceği route - Tüm galeri resimlerini getir
router.get('/', getImages);

// Sadece adminlerin erişebileceği route'lar
router.post('/', protect, addImage);
router.delete('/:id', protect, deleteImage);

module.exports = router;
