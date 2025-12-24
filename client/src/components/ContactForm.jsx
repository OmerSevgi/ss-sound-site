import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../context/ContentContext';
import axios from 'axios';

const ContactForm = () => {
  const { content, loading } = useContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, formData);
      if (res.data.success) {
        setStatus('Mesajınız başarıyla gönderildi!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('Mesaj gönderilirken bir hata oluştu: ' + res.data.error);
      }
    } catch (error) {
      setStatus('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-800 text-white text-center">
        <p>İçerik yükleniyor...</p>
      </section>
    );
  }

  return (
    <section ref={ref} id="iletisim" className={`py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} >
      <div className="container mx-auto px-4">
        <div className={`max-w-3xl mx-auto text-center transition-transform duration-700 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-2 text-gradient-animated">{content.contactTitle}</h2>
          <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-4">{content.contactSubtitle}</p>
          {content.phoneNumber && (
            <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
              Telefon: <a href={`tel:${content.phoneNumber}`} className="text-primary-light dark:text-primary-dark hover:underline">{content.phoneNumber}</a>
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className={`max-w-xl mx-auto transition-transform duration-1000 delay-300 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-text-light/80 dark:text-text-dark/80 mb-2">İsim</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-card-light dark:bg-card-dark rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text-light/80 dark:text-text-dark/80 mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-card-light dark:bg-card-dark rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-text-light/80 dark:text-text-dark/80 mb-2">Telefon Numarası (Opsiyonel)</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-card-light dark:bg-card-dark rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-text-light/80 dark:text-text-dark/80 mb-2">Mesajınız</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full p-3 bg-card-light dark:bg-card-dark rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent" required></textarea>
          </div>
          {status && (
            <div className={`mb-4 text-center ${status.includes('hata') ? 'text-red-500' : 'text-green-500'}`}>
              {status}
            </div>
          )}
          <div className="text-center">
            <button type="submit" disabled={isSubmitting} className="bg-primary-light dark:bg-primary-dark text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 duration-300 ease-in-out">
              {isSubmitting ? 'Gönderiliyor...' : content.contactButtonText}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
