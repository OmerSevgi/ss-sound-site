const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Admin girişi
router.post('/login', authController.loginAdmin);

module.exports = router;
