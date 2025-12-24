const SiteContent = require('../models/SiteContent');

// Site içeriğini getir (veya yoksa oluştur)
exports.getContent = async (req, res) => {
  try {
    let content = await SiteContent.findOne({ singleton: 'main' });
    if (!content) {
      // Eğer içerik dokümanı yoksa, varsayılan değerlerle oluştur
      content = await SiteContent.create({ singleton: 'main' });
    }
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'İçerik getirilemedi: ' + error.message });
  }
};

// Site içeriğini güncelle
exports.updateContent = async (req, res) => {
  try {
    const { heroTitle, heroSubtitle, servicesTitle, servicesSubtitle, galleryTitle, gallerySubtitle, eventsTitle, eventsSubtitle, contactTitle, contactSubtitle, contactButtonText, facebookUrl, instagramUrl, phoneNumber } = req.body;

    // findOneAndUpdate ile bul ve güncelle, yoksa oluştur (upsert: true)
    const updatedContent = await SiteContent.findOneAndUpdate(
      { singleton: 'main' },
      { $set: { heroTitle, heroSubtitle, servicesTitle, servicesSubtitle, galleryTitle, gallerySubtitle, eventsTitle, eventsSubtitle, contactTitle, contactSubtitle, contactButtonText, facebookUrl, instagramUrl, phoneNumber } },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(400).json({ message: 'İçerik güncellenemedi: ' + error.message });
  }
};
