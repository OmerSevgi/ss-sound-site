import React from 'react';
// Swiper komponentlerini ve kütüphanelerini import et
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Swiper CSS dosyalarını import et
import 'swiper/css';

const EventCardCarousel = ({ imageUrls }) => {
  return (
    <div className="relative w-full h-full">
      <Swiper
        // Gerekli modülleri ekle
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true} // Sonsuz döngü
        autoplay={{
          delay: 3000, // 3 saniyede bir kaydır
          disableOnInteraction: false, // Kullanıcı etkileşiminden sonra durmasın
        }}
        className="w-full h-full rounded-md"
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${process.env.REACT_APP_STATIC_ASSET_URL}${url}`}
              alt={`Etkinlik görseli ${index + 1}`}
              className="w-full h-full object-cover bg-gray-900"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventCardCarousel;
