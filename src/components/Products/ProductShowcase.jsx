import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard';
import { productsData } from '../../data/productsData';

// استيراد الـ Styles الأساسية
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProductShowcase = ({ title, category }) => {
  const filteredProducts = productsData.filter(p => p.category === category);

  const prevId = `prev-${category}`;
  const nextId = `next-${category}`;

  return (
    <div className="bg-white py-8 md:py-12 border-b border-gray-50">
      {/* الهيدر */}
      <div className="px-4 md:px-12 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <h2 className="text-xl md:text-4xl font-black italic uppercase tracking-tighter text-black">
            {title}
          </h2>
          <div className="hidden md:block w-16 h-[2px] bg-black"></div>
        </div>

        <div className="flex items-center gap-4">
          <a href="/all" className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1">
            DISCOVER ALL →
          </a>
          <div className="hidden md:flex gap-1">
            <button id={prevId} className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all">
              <span className="text-sm text-center mb-0.5">❮</span>
            </button>
            <button id={nextId} className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white disabled:opacity-20 transition-all">
              <span className="text-sm text-center mb-0.5">❯</span>
            </button>
          </div>
        </div>
      </div>

      {/* السلايدر بتصغير الكروت وتشغيل السحب */}
      <div className="px-4 md:px-12">
        <Swiper
          modules={[Navigation, FreeMode, Mousewheel]}
          navigation={{
            prevEl: `#${prevId}`,
            nextEl: `#${nextId}`,
          }}
          // تفعيل السحب بالماوس وبالإيد
          grabCursor={true}
          freeMode={true}
          mousewheel={{ forceToAxis: true }}
          breakpoints={{
            // موبايل: كروت أصغر (نعرض 2 كروت وحتة)
            320: { 
              slidesPerView: 2.2, 
              spaceBetween: 12 
            },
            // تابلت: نعرض 3 كروت وحتة
            768: { 
              slidesPerView: 3.5, 
              spaceBetween: 15 
            },
            // كمبيوتر: كروت أصغر (نعرض 5.5 كارت بدلاً من 4)
            1024: { 
              slidesPerView: 5.2, 
              spaceBetween: 20 
            },
          }}
          className="w-full overflow-visible"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductShowcase;