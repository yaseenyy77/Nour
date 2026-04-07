import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductShowcase = ({ title }) => {
  const products = [
    { id: 1, name: "lotus pendant", weight: "4.50", karat: "21", company: "BTC", img: "/images/gold-1.jpg" },
    { id: 2, name: "royal bangle", weight: "12.20", karat: "18", company: "SAM", img: "/images/gold-2.jpg" },
    { id: 3, name: "classic ring", weight: "3.15", karat: "21", company: "Nour Gold", img: "/images/gold-3.jpg" },
    { id: 4, name: "gold bar", weight: "10.00", karat: "24", company: "PAMP", img: "/images/gold-4.jpg" },
    { id: 5, name: "infinity chain", weight: "7.80", karat: "18", company: "L'azurde", img: "/images/gold-5.jpg" },
    { id: 6, name: "royal set", weight: "25.00", karat: "21", company: "Nour Gold", img: "/images/gold-6.jpg" },
  ];

  return (
    <div className="bg-white py-2">
      {/* العنوان - خليته متوسطن ومعاه زرار شيك */}
      <div className="flex flex-col items-center mb-6 px-4">
        <h2 className="text-2xl md:text-4xl font-serif italic text-[#001b44] lowercase mb-2">
          {title}
        </h2>
        <a href="/all" className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-black/20 pb-1 hover:border-black transition-all">
          Explore All
        </a>
      </div>

      <div className="relative group/slider w-full border-t border-gray-50">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={2}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5.2 }, // عرض أكتر عشان يظهروا صغيرين
          }}
          className="w-full"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id} className="border-r border-gray-50">
              <ProductCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* الأسهم الجانبية - شفافة وبتظهر بس عند الـ Hover */}
        <button className="custom-prev absolute left-0 top-[40%] z-10 w-12 h-20 bg-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
          <span className="text-black text-2xl font-light">❮</span>
        </button>
        <button className="custom-next absolute right-0 top-[40%] z-10 w-12 h-20 bg-white/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
          <span className="text-black text-2xl font-light">❯</span>
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-button-disabled { display: none !important; }
      `}} />
    </div>
  );
};

export default ProductShowcase;