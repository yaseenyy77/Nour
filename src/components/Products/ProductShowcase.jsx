import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard'; 
import { useSliders } from '../../hooks/useSliders';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProductShowcase = ({ title, category }) => {
  const { data: filteredProducts, isLoading } = useSliders(category);

  const prevId = `prev-${category.replace(/\s+/g, '-')}`;
  const nextId = `next-${category.replace(/\s+/g, '-')}`;

  if (isLoading) {
    return <div className="h-64 bg-gray-50 animate-pulse rounded-3xl m-16" />;
  }

  return (
    <div className="bg-white py-2 border-b border-gray-50 overflow-hidden">
      {/* الهيدر */}
      <div className="px-4 md:px-16 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-[#001b44]">
            {title}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
        </div>
        
        <div className="flex gap-2">
          <button id={prevId} className="w-8 h-8 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full text-xs">❮</button>
          <button id={nextId} className="w-8 h-8 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full text-xs">❯</button>
        </div>
      </div>

      {/* منطقة السلايدر - تم تقليل الـ padding لزيادة مساحة العرض */}
      <div className="px-0 md:px-16"> 
        {filteredProducts && filteredProducts.length > 0 ? (
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            /* الإعدادات الجوهرية للحجم */
            spaceBetween={0} // إلغاء المسافات لاستخدام الـ border كفاصل
            slidesPerView={2.2} // هذا الرقم هو ما يجعل الكارت بنفس حجم الصورة (منتجين وجزء من الثالث)
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
                  id={product.id}
                  name={product.name} 
                  image={product.image}
                  weight={product.weight}
                  material={product.karat}
                  manufacturer={product.manufacturer}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-20 text-center border border-dashed border-gray-100 rounded-3xl">
            <p className="text-[#001b44] font-black uppercase tracking-widest text-[10px] opacity-20">
              Coming Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;