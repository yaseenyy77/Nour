import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard'; 
// التأكد من المسار الصحيح لملف الداتا
import { productsData } from '../../data/productsData';

// استيراد تنسيقات Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProductShowcase = ({ title, category }) => {
  // تصفية المنتجات مع معالجة الحروف (rings vs Ring)
  const filteredProducts = productsData ? productsData.filter(p => {
    if (!p.category) return false;
    // بنخلي الاتنين سمول وبنشيل حرف الـ s في الآخر لو موجود عشان يطابق (rings -> ring)
    const dbCat = p.category.toLowerCase().replace(/s$/, '');
    const propCat = category.toLowerCase().replace(/s$/, '');
    return dbCat === propCat;
  }) : [];

  const prevId = `prev-${category}`;
  const nextId = `next-${category}`;

  return (
    <div className="bg-white py-2 border-b border-gray-50 overflow-hidden">
      <div className="px-6 md:px-16 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-[#001b44]">
            {title}
          </h2>
          <div className="w-12 h-[1px] bg-[#d4af37]"></div>
        </div>
        
        <div className="flex gap-2">
          <button id={prevId} className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full shadow-sm text-sm">
            ❮
          </button>
          <button id={nextId} className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full shadow-sm text-sm">
            ❯
          </button>
        </div>
      </div>

      <div className="px-6 md:px-16">
        {filteredProducts.length > 0 ? (
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            spaceBetween={15}
            slidesPerView={1.3}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4.2 },
            }}
            className="overflow-visible"
          >
            {filteredProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard {...product} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-10 text-center border border-dashed border-gray-100 rounded-2xl">
            <p className="text-[#001b44] font-bold uppercase tracking-widest text-[10px] opacity-20">
              {category} Collection Coming Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;