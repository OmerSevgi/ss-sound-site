import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!user || !user.token) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.get('/events');
      const data = response.data;
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchEvents();
  }, [user, fetchEvents]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      try {
        await api.delete(`/events/${eventId}`);

        fetchEvents();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="text-center p-10">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 text-center p-10">Hata: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-bold">Admin Paneli</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => navigate('/admin/content')} color="blue">İçerik Yönetimi</Button>
          <Button onClick={() => navigate('/admin/messages')} color="blue">Gelen Kutusu</Button>
          <Button onClick={() => navigate('/admin/gallery')} color="blue">Galeri Yönetimi</Button>
          <Button onClick={() => navigate('/admin/events/new')} color="green">Yeni Etkinlik Ekle</Button>
          <Button onClick={handleLogout} color="red">Çıkış Yap</Button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Mevcut Etkinlikler</h2>
      {events.length === 0 ? (
        <p>Henüz hiç etkinlik bulunmuyor.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-card-light dark:bg-card-dark p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h3>
              <p className="text-text-light dark:text-text-dark text-sm mb-1">Tarih: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-text-light dark:text-text-dark text-sm mb-1">Konum: {event.location}</p>
              <p className="text-text-light dark:text-text-dark text-sm mb-4">Kategori: {event.category}</p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => navigate(`/admin/events/edit/${event._id}`)} color="yellow">Düzenle</Button>
                <Button size="sm" onClick={() => handleDeleteEvent(event._id)} color="red">Sil</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Button component
const Button = ({ children, onClick, color = 'blue', size = 'md' }) => {
  const base = 'font-bold rounded transition-colors duration-200';
  const sizes = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
  };
  const colors = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  };

  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${colors[color]}`}>
      {children}
    </button>
  );
};

export default AdminDashboardPage;
