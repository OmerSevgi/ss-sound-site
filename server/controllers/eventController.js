const Event = require('../models/Event');

// Tüm etkinlikleri getir
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 }); // En yeniye göre sırala
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni etkinlik oluştur
exports.createEvent = async (req, res) => {
  const { name, description, date, location, category, imageUrls, videoUrls } = req.body;

  const event = new Event({
    name,
    description,
    date,
    location,
    category,
    imageUrls,
    videoUrls,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Belirli bir etkinliği getir
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Etkinlik bulunamadı' });
    
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Etkinliği güncelle
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Etkinlik bulunamadı' });

    const { name, description, date, location, category, imageUrls, videoUrls } = req.body;

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.category = category || event.category;
    event.imageUrls = imageUrls || event.imageUrls;
    event.videoUrls = videoUrls || event.videoUrls;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Etkinliği sil
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Etkinlik bulunamadı' });

    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Etkinlik başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
