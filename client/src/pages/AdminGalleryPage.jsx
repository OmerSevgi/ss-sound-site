import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminGalleryPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [editingDescriptions, setEditingDescriptions] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const fetchImages = async () => {
    try {
      setIsFetching(true);
      const response = await api.get('/gallery');
      setImages(response.data);
      const initialDescriptions = response.data.reduce((acc, img) => {
        acc[img._id] = img.description || '';
        return acc;
      }, {});
      setEditingDescriptions(initialDescriptions);
      setError('');
    } catch (err) {
      setError('Resimler yüklenemedi: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setError('Lütfen en az bir dosya seçin.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('media', file));

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const uploadResponse = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { urls } = uploadResponse.data;
      if (!urls || urls.length === 0) throw new Error('Dosyalar yüklendi ancak resim URL\'leri alınamadı.');

      await api.post('/gallery', { imageUrls: urls, description });

      setSuccess(`${urls.length} resim başarıyla yüklendi!`);
      setSelectedFiles([]);
      setDescription('');
      document.getElementById('imageFile').value = null;
      fetchImages();
    } catch (err) {
      setError('Yükleme başarısız: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDescriptionChange = (e, id) => {
    setEditingDescriptions({ ...editingDescriptions, [id]: e.target.value });
  };

  const handleDescriptionUpdate = async (id) => {
    try {
      await api.put(`/gallery/${id}`, { description: editingDescriptions[id] });
      setSuccess('Açıklama başarıyla güncellendi.');
      // Refetch images to confirm update
      fetchImages(); 
    } catch (err) {
      setError('Açıklama güncellenemedi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu resmi silmek istediğinizden emin misiniz?')) {
      try {
        setError('');
        setSuccess('');
        await api.delete(`/gallery/${id}`);
        setSuccess('Resim başarıyla silindi.');
        fetchImages();
      } catch (err) {
        setError('Silme işlemi başarısız: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Galeri Yönetimi</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Panele Dön
        </button>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-3 mb-4 rounded">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 mb-4 rounded">{success}</p>}

      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Yeni Resim(ler) Yükle</h2>
        <form onSubmit={handleUpload}>
          <div className="mb-4">
            <label htmlFor="description" className="block text-text-light dark:text-text-dark font-medium mb-2">
              Resim Açıklaması (Tümü için geçerli, opsiyonel)
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageFile" className="block text-text-light dark:text-text-dark font-medium mb-2">Resim Dosyaları</label>
            <input
              type="file"
              id="imageFile"
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
              required
              multiple
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="mb-4">
              <p className="font-medium mb-2">Seçilen Dosyalar:</p>
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="text-sm p-2 bg-gray-100 rounded">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary-light text-white px-4 py-2 rounded-lg hover:bg-opacity-80 disabled:bg-opacity-50"
          >
            {loading ? `Yükleniyor... (${selectedFiles.length})` : `Seçilen ${selectedFiles.length} Resmi Yükle`}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mevcut Resimler</h2>
        {isFetching ? <p>Resimler yükleniyor...</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image._id} className="border rounded-lg overflow-hidden shadow-md bg-card-light dark:bg-card-dark flex flex-col">
                  <img src={image.imageUrl} alt={editingDescriptions[image._id] || 'Galeri Resmi'} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col flex-grow">
                    <textarea
                      value={editingDescriptions[image._id] || ''}
                      onChange={(e) => handleDescriptionChange(e, image._id)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-sm flex-grow"
                      placeholder="Resim açıklaması girin..."
                      rows="3"
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => handleDescriptionUpdate(image._id)}
                        className="bg-primary-light text-white px-3 py-1 rounded-lg hover:bg-opacity-80 text-sm"
                      >
                        Kaydet
                      </button>
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="bg-red-600 text-white rounded-full p-2 text-xs hover:bg-red-700"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Henüz hiç resim eklenmemiş.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryPage;
