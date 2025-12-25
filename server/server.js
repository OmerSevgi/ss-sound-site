const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

// Express uygulamasını başlat
const app = express();

// CORS ayarı (Vercel domainini .env içine ekle)
app.use(cors({
  origin: ["https://ss-sound-site.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// JSON verisini parse et
app.use(express.json());

// Public klasörünü aç (örneğin yüklenen görseller için)
app.use(express.static('public'));

// === API Rotaları ===
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const galleryRoutes = require('./routes/gallery');
app.use('/api/gallery', galleryRoutes);

const contentRoutes = require('./routes/content');
app.use('/api/content', contentRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// === Test rotası ===
app.get('/', (req, res) => {
  res.json({ message: '✅ ss Organizasyon API çalışıyor (Render üzerinde).' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// === MongoDB bağlantısı ===
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

// === Sunucuyu başlat ===
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda calisiyor...`);
  });
});
