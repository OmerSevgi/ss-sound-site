import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminContentPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    servicesTitle: '',
    servicesSubtitle: '',
    galleryTitle: '',
    gallerySubtitle: '',
    eventsTitle: '',
    eventsSubtitle: '',
    contactTitle: '',
    contactSubtitle: '',
    contactButtonText: '',
    facebookUrl: '',
    instagramUrl: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // İçerik verilerini çek
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await api.get('/content', {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setContent(response.data);
      } catch (err) {
        setError('İçerik yüklenemedi: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchContent();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      await api.put('/content', content, { headers: { Authorization: `Bearer ${user?.token}` } });
      setSuccess('İçerik başarıyla güncellendi!');
    } catch (err) {
      setError('Güncelleme başarısız: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (!user?.token) return <div className="text-center p-10">Yetkisiz erişim. Lütfen giriş yapın.</div>;

  if (loading) return <div className="text-center p-10">İçerik yükleniyor...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ana Sayfa İçerik Yönetimi</h1>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
        >
          Panele Dön
        </button>
      </div>

      {error && <p className="text-red-500 bg-red-100 p-3 mb-4 rounded">{error}</p>}
      {success && <p className="text-green-500 bg-green-100 p-3 mb-4 rounded">{success}</p>}

      <form onSubmit={handleSave} className="bg-card-light dark:bg-card-dark p-6 rounded-lg shadow-md space-y-6">
        {/* Hero */}
        <Section title="Karşılama Alanı (Hero Banner)">
          <Input label="Ana Başlık" name="heroTitle" value={content.heroTitle} onChange={handleChange} />
          <Textarea label="Alt Başlık" name="heroSubtitle" value={content.heroSubtitle} onChange={handleChange} />
        </Section>

        {/* Hizmetler */}
        <Section title="Hizmetler Bölümü">
          <Input label="Başlık" name="servicesTitle" value={content.servicesTitle} onChange={handleChange} />
          <Textarea label="Alt Başlık" name="servicesSubtitle" value={content.servicesSubtitle} onChange={handleChange} />
        </Section>

        {/* Galeri */}
        <Section title="Galeri Bölümü">
          <Input label="Başlık" name="galleryTitle" value={content.galleryTitle} onChange={handleChange} />
          <Textarea label="Alt Başlık" name="gallerySubtitle" value={content.gallerySubtitle} onChange={handleChange} />
        </Section>

        {/* Etkinlikler */}
        <Section title="Son Etkinlikler Bölümü">
          <Input label="Başlık" name="eventsTitle" value={content.eventsTitle} onChange={handleChange} />
          <Textarea label="Alt Başlık" name="eventsSubtitle" value={content.eventsSubtitle} onChange={handleChange} />
        </Section>

        {/* İletişim */}
        <Section title="İletişim Formu Bölümü">
          <Input label="Başlık" name="contactTitle" value={content.contactTitle} onChange={handleChange} />
          <Textarea label="Alt Başlık" name="contactSubtitle" value={content.contactSubtitle} onChange={handleChange} />
          <Input label="Buton Metni" name="contactButtonText" value={content.contactButtonText} onChange={handleChange} />
          <Input label="Telefon Numarası (Opsiyonel)" name="phoneNumber" value={content.phoneNumber} onChange={handleChange} />
        </Section>

        {/* Sosyal Medya */}
        <Section title="Sosyal Medya Bağlantıları">
          <Input label="Facebook URL" name="facebookUrl" value={content.facebookUrl} onChange={handleChange} />
          <Input label="Instagram URL" name="instagramUrl" value={content.instagramUrl} onChange={handleChange} />
        </Section>

        <button
          type="submit"
          disabled={saving}
          className="bg-primary-light text-white px-6 py-2 rounded-lg hover:bg-opacity-80 disabled:bg-opacity-50"
        >
          {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </form>
    </div>
  );
};

// Componentler
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-text-light dark:text-text-dark font-medium mb-2">{label}</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark"
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-text-light dark:text-text-dark font-medium mb-2">{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      rows="3"
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark"
    ></textarea>
  </div>
);

export default AdminContentPage;
