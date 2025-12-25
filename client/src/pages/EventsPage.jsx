import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import api from '../services/api';
import EventCardCarousel from '../components/EventCardCarousel';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get('/events');
        setEvents(data);
      } catch (err) {
        console.error('Etkinlikleri çekerken hata:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-text-light dark:text-text-dark text-center p-10">
        Etkinlikler yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-10">
        Hata: {error}
      </div>
    );
  }

  return (
    <section
      ref={ref}
      className="py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark"
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-12 text-gradient-animated">
          Tüm Etkinlikler
        </h1>
        {events.length === 0 ? (
          <p>Henüz hiç etkinlik bulunmuyor.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Link
                to={`/etkinlikler/${event._id}`}
                key={event._id}
                className="block h-full"
              >
                <div
                  className={`bg-card-light dark:bg-card-dark rounded-lg shadow-lg dark:border dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-2 transition-all duration-500 ease-in-out ${inView ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {event.imageUrls?.length > 1 ? (
                    <div className="w-full h-40 rounded-t-lg overflow-hidden">
                      <EventCardCarousel imageUrls={event.imageUrls} />
                    </div>
                  ) : (
                    <img
                      src={(event.imageUrls && event.imageUrls.length > 0) ? `${process.env.REACT_APP_STATIC_ASSET_URL}
     ${event.imageUrls[0]}` : 'https://via.placeholder.com/400x300'}
                      alt={event.name}
                      className="w-full h-40 object-cover bg-card-light dark:bg-card-dark rounded-t-lg"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/400x300')}
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
  );
};

export default EventsPage;
