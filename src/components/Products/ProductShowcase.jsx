import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard'; 
import { useSliders } from '../../hooks/useSliders';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProductShowcase = ({ title, brand }) => {
  const { data: filteredProducts, isLoading } = useSliders(brand);

  // توليد IDs فريدة للتنقل بناءً على اسم البراند لتجنب تداخل السلايدرز
  const brandSlug = brand.replace(/\s+/g, '-').toLowerCase();
  const prevId = `prev-${brandSlug}`;
  const nextId = `next-${brandSlug}`;

  if (isLoading) {
    return (
      <div className="px-4 md:px-16 mb-12">
        <div className="h-8 w-48 bg-gray-50 animate-pulse mb-6 rounded-lg"></div>
        <div className="h-72 bg-gray-50/50 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="bg-white py-6 border-b border-gray-50 overflow-hidden">
      {/* الهيدر العلوي للبراند */}
      <div className="px-4 md:px-16 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-[#001b44]">
            {title}
          </h2>
          <div className="w-16 h-[1px] bg-[#d4af37]"></div>
        </div>
        
        {/* أزرار التحكم في السلايدر */}
        <div className="flex gap-3">
          <button id={prevId} className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full text-xs shadow-sm">❮</button>
          <button id={nextId} className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full text-xs shadow-sm">❯</button>
        </div>
      </div>

      {/* منطقة عرض المنتجات */}
      <div className="px-0 md:px-16"> 
        {filteredProducts && filteredProducts.length > 0 ? (
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            spaceBetween={0}
            slidesPerView={2.2}
            freeMode={true}
            breakpoints={{ 
              640: { slidesPerView: 3.2 }, 
              1024: { slidesPerView: 5.2 } 
            }}
            className="overflow-visible"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id} className="border-r border-gray-100">
                <ProductCard 
                  {...product}
                  material={product.karat || product.material}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-24 text-center border border-dashed border-gray-100 rounded-3xl mx-4 md:mx-0">
            <p className="text-[#001b44] font-black uppercase tracking-widest text-[10px] opacity-20">
              {brand} Collection Coming Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;