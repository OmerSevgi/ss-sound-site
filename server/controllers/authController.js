const User = require('../models/User');
const jwt = require('jsonwebtoken');

// JWT token oluşturma fonksiyonu
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Admin kaydı (sadece ilk admin için kullanılabilir veya manuel oluşturulur)
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Sadece ilk adminin kayıt olmasına izin ver veya manuel oluştur
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin zaten mevcut, yeni admin kaydı yapılamaz.' });
    }

    const user = await User.create({
      username,
      password,
      role: 'admin',
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Geçersiz kullanıcı verisi' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin girişi
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
