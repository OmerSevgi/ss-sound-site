const GalleryImage = require('../models/GalleryImage');

// Tüm galeri resimlerini getir
exports.getImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Yeni galeri resimleri ekle (çoklu)
exports.addImage = async (req, res) => {
  // Frontend'den 'imageUrls' olarak bir dizi ve tek bir 'caption' bekliyoruz
  const { imageUrls, description } = req.body;

  if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    return res.status(400).json({ message: 'Resim URL dizisi gereklidir.' });
  }

  try {
    // Gelen her bir URL için bir doküman oluştur
    const imagesToSave = imageUrls.map(url => ({
      imageUrl: url,
      description: description, // Tüm resimler için aynı açıklamayı kullan
    }));

    // Tüm resimleri veritabanına tek seferde ekle
    const savedImages = await GalleryImage.insertMany(imagesToSave);
    
    res.status(201).json(savedImages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Bir galeri resmini güncelle (açıklama)
exports.updateImage = async (req, res) => {
  try {
    const { description } = req.body;
    const image = await GalleryImage.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Resim bulunamadı' });
    }

    image.description = description;
    await image.save();

    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Bir galeri resmini sil
exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Resim bulunamadı' });
    }

    await GalleryImage.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Resim başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
