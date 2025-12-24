const express = require('express');
const router = express.Router();
const {
  getContent,
  updateContent,
} = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

// Herkesin erişebileceği route - Site içeriğini getir
router.get('/', getContent);

// Sadece adminlerin erişebileceği route - Site içeriğini güncelle
router.put('/', protect, updateContent);

module.exports = router;
