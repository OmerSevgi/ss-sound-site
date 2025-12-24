import React from 'react';
import { useContent } from '../context/ContentContext'; // Import the hook

const HeroBanner = () => {
  const { content, loading } = useContent(); // Consume the context

  // You can add a loading state here if you want
  if (loading) {
    // Render a placeholder or nothing while content is loading
    return (
      <div className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/0a0a0a/808080?text=Organizasyon+Sahnesi')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">Yükleniyor...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://via.placeholder.com/1920x1080/0a0a0a/808080?text=Organizasyon+Sahnesi')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          {content.heroTitle}
        </h1>
        <p className="text-lg md:text-xl mb-8 animate-fade-in-up">
          {content.heroSubtitle}
        </p>
        <a href="#iletisim" className="bg-primary-light dark:bg-primary-dark text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 duration-300 ease-in-out">
          Teklif Alın
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;