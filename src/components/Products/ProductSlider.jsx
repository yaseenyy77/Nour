import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductSlider = () => {
  // ... الداتا كما هي
  return (
    <div className="relative group/slider w-full">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={2}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full relative"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} className="border-r border-gray-100">
            <ProductCard {...item} />
          </SwiperSlide>
        ))}

        {/* تصميم الأسهم المخصص عشان متبقاش بايظة */}
        <div className="swiper-button-prev !text-black/30 hover:!text-black !after:text-xl transition-all"></div>
        <div className="swiper-button-next !text-black/30 hover:!text-black !after:text-xl transition-all"></div>
      </Swiper>

      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev {
          top: 40% !important; /* مكان السهم في نص الصورة بالظبط */
          background: rgba(255,255,255,0.8);
          width: 40px !important;
          height: 60px !important;
          margin-top: 0 !important;
        }
        .swiper-button-prev { left: 0 !important; border-radius: 0 4px 4px 0; }
        .swiper-button-next { right: 0 !important; border-radius: 4px 0 0 4px; }
        .swiper-button-disabled { opacity: 0 !important; }
      `}</style>
    </div>
  );
};