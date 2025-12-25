import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import EventCardCarousel from '../components/EventCardCarousel'; // Yeni import

// Basit ikon komponentleri
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-primary-light dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-primary-light dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);

const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-primary-light dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
);

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-text-light dark:text-text-dark">Yükleniyor...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Hata: {error}</div>;
  if (!event) return <div className="text-center mt-20 text-text-light dark:text-text-dark">Etkinlik bulunamadı.</div>;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <motion.div
        className="max-w-5xl mx-auto bg-card-light dark:bg-card-dark rounded-2xl shadow-2xl dark:border dark:border-gray-700 overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="relative">
          {(event.imageUrls && event.imageUrls.length > 1) ? (
            <div className="w-full h-64 lg:h-full">
              <EventCardCarousel imageUrls={event.imageUrls} />
            </div>
          ) : (
            <img
              src={(event.imageUrls && event.imageUrls.length > 0) ? event.imageUrls[0] : 'https://via.placeholder.com/800x600'}
              alt={event.name}
              className="w-full h-64 lg:h-full object-cover bg-card-light dark:bg-card-dark"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </motion.div>

        <motion.div variants={itemVariants} className="p-8 flex flex-col justify-center">
          <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight text-gradient-animated">{event.name}</motion.h1>

          <motion.div variants={itemVariants} className="space-y-4 text-lg text-text-light/80 dark:text-text-dark/80 mb-6">
            <p className="flex items-center"><CalendarIcon />
              {new Date(event.date).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </p>
            <p className="flex items-center"><LocationIcon /> {event.location}</p>
            <p className="flex items-center"><CategoryIcon /> {event.category}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none text-text-light/70 dark:text-text-dark/70 leading-relaxed">
            <p>{event.description}</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EventDetailPage;