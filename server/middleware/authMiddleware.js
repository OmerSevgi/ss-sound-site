const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token'ı header'dan al ('Bearer' kelimesini ayır)
      token = req.headers.authorization.split(' ')[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Kullanıcıyı token ID'si ile bul ve şifre olmadan req objesine ekle
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Protect middleware sadece token doğrular, yetkilendirme authorize ile yapılır

    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Geçersiz token, yetkilendirme başarısız' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Token bulunamadı, yetkilendirme başarısız' });
  }
};

// Rol tabanlı yetkilendirme middleware'i
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `User role ${req.user ? req.user.role : 'none'} is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };
