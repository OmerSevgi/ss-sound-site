const ContactMessage = require('../models/ContactMessage');

// Yeni bir iletişim mesajı oluştur
exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    const newContactMessage = await ContactMessage.create({ name, email, message, phone });
    res.status(201).json({ success: true, data: newContactMessage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Tüm iletişim mesajlarını getir (Admin paneli için)
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Bir iletişim mesajını ID'ye göre getir
exports.getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: 'Mesaj bulunamadı.' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Bir iletişim mesajını okunmuş olarak işaretle
exports.markContactMessageAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, error: 'Mesaj bulunamadı.' });
    }
    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Bir iletişim mesajını sil
exports.deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: 'Mesaj bulunamadı.' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
