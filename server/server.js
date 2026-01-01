const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// ✅ CORS
app.use(cors({
  origin: [process.env.CLIENT_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Preflight
app.options("*", cors());

app.use(express.json());
app.use(express.static('public'));

// === API Rotaları ===
app.use('/api/events', require('./routes/events'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/content', require('./routes/content'));
app.use('/api/contact', require('./routes/contact'));

// === Test rotası ===
app.get('/', (req, res) => {
  res.json({ message: '✅ ss Organizasyon API çalışıyor (Render üzerinde).' });
});

// (İsteğe bağlı – şu an sorun yok)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// === MongoDB ===
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB bağlantısı başarılı!');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  });
});
