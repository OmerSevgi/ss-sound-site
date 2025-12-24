import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ServicesSection from '../components/ServicesSection';
import GallerySection from '../components/GallerySection';
import ContactForm from '../components/ContactForm';
import EventCardCarousel from '../components/EventCardCarousel';
import api from '../services/api';
import { useContent } from '../context/ContentContext';

const HomePage = () => {
  const { content, loading: contentLoading } = useContent();
  const [recentEvents, setRecentEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // ✅ API URL sabitini al — yoksa yedek olarak Render URL'sini kullan
  const API_URL = process.env.REACT_APP_API_URL || "https://ss-sound-web-site.onrender.com/api";


  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoadingEvents(true);
        const response = await api.get('/events');
        const data = response.data || [];
        const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentEvents(sortedEvents.slice(0, 3));
      } catch (err) {
        console.error("Etkinlikler yüklenemedi:", err);
        setError("Etkinlikler alınamadı. Lütfen daha sonra tekrar deneyin.");
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchRecentEvents();
  }, []);

  // ✅ İçerik yükleniyorsa placeholder görünüm
  if (contentLoading) {
    return (
      <div>
        <HeroBanner />
        <ServicesSection />
        <GallerySection />
        <section className="py-20 bg-gray-800 text-white text-center">
          <p>İçerik yükleniyor...</p>
        </section>
        <ContactForm />
      </div>
    );
  }

  return (
    <div>
      <HeroBanner />
      <ServicesSection />
      <GallerySection />

      <section ref={ref} className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className={`transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-2 text-gradient-animated">{content.eventsTitle}</h2>
            <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">
              {content.eventsSubtitle}
            </p>
          </div>

          {loadingEvents ? (
            <p>Yükleniyor...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : recentEvents.length === 0 ? (
            <p>Henüz hiç etkinlik bulunmuyor.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentEvents.map((event, index) => (
                <Link to={`/etkinlikler/${event._id}`} key={event._id} className="block h-full">
                  <div
                    className={`bg-card-light dark:bg-card-dark rounded-lg shadow-lg dark:border dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-2 transition-all duration-500 ease-in-out ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {/* ✅ Görsel URL'lerini güvenli biçimde oluştur */}
                    {event.imageUrls && event.imageUrls.length > 0 ? (
                      <div className="w-full h-40 rounded-t-lg overflow-hidden">
                        {event.imageUrls.length > 1 ? (
                          <EventCardCarousel imageUrls={event.imageUrls.map(url => `${process.env.REACT_APP_STATIC_ASSET_URL}${url}`)} />
                        ) : (
                          <img
                            src={`${process.env.REACT_APP_STATIC_ASSET_URL}${event.imageUrls[0]}`}
                            alt={event.name}
                            className="w-full h-40 object-cover bg-card-light dark:bg-card-dark rounded-t-lg"
                          />
                        )}
                      </div>
                    ) : (
                      <img
                        src="https://placehold.co/400x300?text=Etkinlik+Resmi+Yok"
                        alt="Placeholder"
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                    )}

                    <div className="p-4 flex-grow">
                      <h3 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-2 truncate">
                        {event.name}
                      </h3>
                      <p className="text-text-light/70 dark:text-text-dark/70 text-sm truncate">
                        Konum: {event.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
    </div>
  );
};

export default HomePage;
