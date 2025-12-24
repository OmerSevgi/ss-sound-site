import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import EventForm from '../components/EventForm';

const AdminNewEventPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateEvent = async (formData, mediaFiles) => {
    setIsLoading(true);
    setError(null);

    try {
      let uploadedImageUrls = [];
      let uploadedVideoUrls = [];

      if (mediaFiles && mediaFiles.length > 0) {
        const mediaFormData = new FormData();
        mediaFiles.forEach(file => mediaFormData.append('media', file));

        const uploadResponse = await api.post('/upload', mediaFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        uploadResponse.data.urls.forEach(url => {
          if (url.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp)$/i)) uploadedImageUrls.push(url);
          else if (url.match(/\.(mp4|mov|avi|mkv|webm|ogg)$/i)) uploadedVideoUrls.push(url);
        });
      }

      const finalEventData = { ...formData, imageUrls: uploadedImageUrls, videoUrls: uploadedVideoUrls };
      await api.post('/events', finalEventData);

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !user.token) return <div className="text-center p-10">Yetkisiz erişim. Lütfen giriş yapın.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Yeni Etkinlik Ekle</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded">
          Panele Dön
        </button>
      </div>
      {error && <p className="text-red-500 text-center mb-4">Hata: {error}</p>}
      <EventForm onSubmit={handleCreateEvent} isLoading={isLoading} />
    </div>
  );
};

export default AdminNewEventPage;
