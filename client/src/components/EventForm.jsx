import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const EventForm = ({ initialData = {}, onSubmit, isEditMode = false, isLoading = false }) => {
  const [formData, setFormData] = useState({ name: '', description: '', date: '', location: '', category: 'Diğer' });
  const [newMedia, setNewMedia] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [existingVideoUrls, setExistingVideoUrls] = useState([]);
  const [deletedMediaUrls, setDeletedMediaUrls] = useState([]);

  const categories = ['Düğün', 'Konser', 'Festival', 'Kurumsal', 'Özel Parti', 'Diğer'];

  useEffect(() => {
    if (isEditMode && initialData) {
      setFormData({ name: initialData.name || '', description: initialData.description || '', date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '', location: initialData.location || '', category: initialData.category || 'Diğer' });
      setExistingImageUrls(initialData.imageUrls || []);
      setExistingVideoUrls(initialData.videoUrls || []);
    }
  }, [isEditMode, initialData]);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }));
    setNewMedia(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg', '.bmp'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.ogg']
    }
  });

  const removeNewFile = (fileToRemove) => setNewMedia(prev => prev.filter(file => file !== fileToRemove));
  
  const removeExistingMedia = (urlToRemove) => {
    setExistingImageUrls(prev => prev.filter(url => url !== urlToRemove));
    setExistingVideoUrls(prev => prev.filter(url => url !== urlToRemove));
    setDeletedMediaUrls(prev => [...prev, urlToRemove]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, newMedia, deletedMediaUrls);
  };

  const renderFilePreview = (file) => {
    // file bir string ise (mevcut medya), URL'den tip çıkarımı yap
    if (typeof file === 'string') {
      const src = `${process.env.REACT_APP_STATIC_ASSET_URL}${file}`;
      if (file.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i)) {
        return <img src={src} alt="Mevcut medya" className="w-full h-full object-cover" />;
      }
      if (file.match(/\.(mp4|mov|avi|mkv|webm|ogg)$/i)) {
        return <video src={src} controls className="w-full h-full object-cover" />;
      }
    }
    // file bir File nesnesi ise (yeni yükleme), MIME tipini kullan
    else if (file && file.type) {
      if (file.type.startsWith('image/')) {
        return <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />;
      }
      if (file.type.startsWith('video/')) {
        return <video src={file.preview} controls className="w-full h-full object-cover" />;
      }
    }
    // Hiçbiri eşleşmezse
    return <div className="flex items-center justify-center w-full h-full bg-background-light dark:bg-background-dark"><p className="text-xs text-text-light dark:text-text-dark">Önizleme yok</p></div>;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg space-y-6">
      {/* ... form fields ... */}
      <div>
        <label htmlFor="name" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Etkinlik Adı:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" required />
      </div>
      <div>
        <label htmlFor="description" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Açıklama:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" required></textarea>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Tarih:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" required />
        </div>
        <div>
          <label htmlFor="location" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Konum:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark" required />
        </div>
      </div>
      <div>
        <label htmlFor="category" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Kategori:</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-background-light dark:bg-background-dark rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark">
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Mevcut Medya Önizleme */}
      {(existingImageUrls.length > 0 || existingVideoUrls.length > 0) && (
        <div>
          <h4 className="text-text-light dark:text-text-dark text-sm font-bold mb-2">Mevcut Medyalar:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...existingImageUrls, ...existingVideoUrls].map((url) => (
              <div key={url} className="relative aspect-w-1 aspect-h-1">
                {renderFilePreview(url)}
                <button type="button" onClick={() => removeExistingMedia(url)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs leading-none">X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dosya Yükleme Alanı */}
      <div>
        <label className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Yeni Fotoğraf/Video Ekle:</label>
        <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary-light dark:border-primary-dark bg-gray-100 dark:bg-gray-700' : 'border-gray-300 dark:border-gray-600 hover:border-primary-light dark:hover:border-primary-dark'}`}>
          <input {...getInputProps()} />
          <p>{isDragActive ? 'Dosyaları buraya bırakın...' : 'Dosyaları sürükleyip bırakın veya seçmek için tıklayın'}</p>
        </div>
      </div>

      {/* Yeni Yüklenecekler Önizleme */}
      {newMedia.length > 0 && (
        <div>
          <h4 className="text-text-light dark:text-text-dark text-sm font-bold mb-2">Yeni Eklenecek Dosyalar:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newMedia.map((file, index) => (
              <div key={index} className="relative aspect-w-1 aspect-h-1">
                {renderFilePreview(file)}
                <button type="button" onClick={() => removeNewFile(file)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs leading-none">X</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center pt-4">
        <button type="submit" disabled={isLoading} className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 disabled:bg-gray-500">
          {isLoading ? 'İşleniyor...' : (isEditMode ? 'Etkinliği Güncelle' : 'Etkinlik Ekle')}
        </button>
      </div>
    </form>
  );
};

export default EventForm;


