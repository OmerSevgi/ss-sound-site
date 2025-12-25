import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Use the centralized api instance
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminContactMessagesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await api.get('/contact');
        setMessages(res.data.data);
      } catch (err) {
        setError('Mesajlar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user, navigate]);

  const markAsRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(prev => ({ ...prev, isRead: true }));
      }
    } catch (err) {
      setError('Mesaj okunmuş olarak işaretlenirken bir hata oluştu.');
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages(messages.filter(msg => msg._id !== id));
      setSelectedMessage(null);
      setIsModalOpen(false);
    } catch (err) {
      setError('Mesaj silinirken bir hata oluştu.');
      console.error(err);
    }
  };


  const openModal = (message) => { setSelectedMessage(message); setIsModalOpen(true); };
  const closeModal = () => { setSelectedMessage(null); setIsModalOpen(false); };

  if (loading) return <div className="container mx-auto p-4">Mesajlar yükleniyor...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">Hata: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gelen Kutusu</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Panele Dön
        </button>
      </div>

      {messages.length === 0 ? <p>Henüz gelen bir mesaj yok.</p> : (
        <div className="bg-card-light dark:bg-card-dark shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                <th className="px-5 py-3">
                  Okundu
                </th>
                <th className="px-5 py-3">
                  İsim
                </th>
                <th className="px-5 py-3">
                  E-posta
                </th>
                <th className="px-5 py-3">
                  Mesaj
                </th>
                <th className="px-5 py-3">
                  Tarih
                </th>
                <th className="px-5 py-3">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {messages.map(message => (
                <tr key={message._id} onClick={() => openModal(message)} className={`${message.isRead ? 'bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400' : 'bg-white dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700`}>
                  <td className="px-5 py-5 text-sm">
                    <input type="checkbox" checked={message.isRead} onChange={(e) => { e.stopPropagation(); markAsRead(message._id); }} className="w-4 h-4" />
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{message.name}</p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{message.email}</p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-600 dark:text-gray-300 whitespace-no-wrap">{message.message.substring(0, 50)}...</p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <p className="text-gray-900 dark:text-white whitespace-no-wrap">{new Date(message.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-5 py-5 text-sm">
                    <button onClick={(e) => { e.stopPropagation(); deleteMessage(message._id); }} className="text-red-500 hover:text-red-700 whitespace-no-wrap">Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-xl max-w-lg w-full mx-4 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-4">Mesaj Detayı</h2>
            <div className="mb-4">
              <p><strong>İsim:</strong> {selectedMessage.name}</p>
              <p><strong>E-posta:</strong> {selectedMessage.email}</p>
              {selectedMessage.phone && <p><strong>Telefon:</strong> {selectedMessage.phone}</p>}
              <p><strong>Tarih:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
              <p><strong>Okundu:</strong> {selectedMessage.isRead ? 'Evet' : 'Hayır'}</p>
            </div>
            <div className="mb-4 p-4 bg-background-light dark:bg-background-dark rounded-md">
              <p><strong>Mesaj:</strong></p>
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <div className="flex justify-end space-x-4">
              {!selectedMessage.isRead && <button onClick={() => markAsRead(selectedMessage._id)} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Okundu Olarak İşaretle</button>}
              <button onClick={() => deleteMessage(selectedMessage._id)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">Sil</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessagesPage;
