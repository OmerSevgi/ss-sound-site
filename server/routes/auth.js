const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin kaydı (sadece ilk admin için)
router.post('/register', authController.registerAdmin);

// Admin girişi
router.post('/login', authController.loginAdmin);

module.exports = router;
