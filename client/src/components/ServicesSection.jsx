import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useContent } from '../context/ContentContext'; // Import the hook

// Örnek hizmet verileri (bu kısım değişmeyecek, sadece başlık ve alt başlık dinamikleşecek)
const services = [
  {
    icon: '💍', title: 'Düğün Organizasyonları', description: 'Hayatınızın en özel gününü kusursuz bir anıya dönüştürüyoruz.',
  },
  {
    icon: '🎤', title: 'Konser ve Festivaller', description: 'Sanatçıları ve kitleleri unutulmaz atmosferlerde bir araya getiriyoruz.',
  },
  {
    icon: '🎉', title: 'Kurumsal Etkinlikler', description: 'Şirket lansmanları, partiler ve toplantılar için profesyonel çözümler.',
  },
  {
    icon: '🎂', title: 'Özel Partiler', description: 'Doğum günleri, yıl dönümleri ve tüm kutlamalarınız için özel konseptler.',
  },
];

const ServicesSection = () => {
  const { content, loading } = useContent(); // Consume the context

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (loading) {
    return (
      <section className="py-20 bg-gray-800 text-white text-center">
        <p>İçerik yükleniyor...</p>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`py-20 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} >
      <div className="container mx-auto px-4 text-center">
        <div className={`transform transition-transform duration-1000 ${inView ? 'translate-y-0' : 'translate-y-10'}`}>
          <h2 className="text-4xl font-bold mb-2">{content.servicesTitle}</h2>
          <p className="text-lg text-text-light/80 dark:text-text-dark/80 mb-12">{content.servicesSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-card-light dark:bg-card-dark rounded-lg shadow-lg dark:border dark:border-gray-700 h-full flex flex-col transform hover:-translate-y-2 transition-all duration-500 ease-in-out ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gradient-animated">{service.title}</h3>
              <p className="text-text-light/70 dark:text-text-dark/70">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
