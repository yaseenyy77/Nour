import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import ProductCard from './ProductCard'; 
import { supabase } from '../supabaseClient'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const ProductShowcase = ({ title, category }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      // تنظيف اسم الكاتيجوري لضمان المطابقة (مسح الفراغات وتحويلها لسمول)
      const cleanCategory = category.toLowerCase().trim();
      
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .eq('category', cleanCategory);
      
      if (!error) setItems(data || []);
      setLoading(false);
    };
    fetchItems();
  }, [category]);

  const prevId = `prev-${category.replace(/\s+/g, '-')}`;
  const nextId = `next-${category.replace(/\s+/g, '-')}`;

  if (loading) return null;

  return (
    <div className="bg-white py-12 border-b border-gray-50 overflow-hidden">
      <div className="px-6 md:px-16 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-[#001b44]">
            {title}
          </h2>
          <div className="w-16 h-[2px] bg-[#d4af37]"></div>
        </div>
        
        <div className="flex gap-3">
          <button id={prevId} className="w-12 h-12 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full shadow-lg">❮</button>
          <button id={nextId} className="w-12 h-12 border border-gray-100 flex items-center justify-center hover:bg-[#001b44] hover:text-white transition-all rounded-full shadow-lg">❯</button>
        </div>
      </div>

      <div className="px-6 md:px-16">
        {items.length > 0 ? (
          <Swiper
            modules={[Navigation, FreeMode]}
            navigation={{ prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
            spaceBetween={20}
            slidesPerView={1.3}
            freeMode={true}
            breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4.5 } }}
            className="overflow-visible"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard 
                  name={`${category.replace(/s$/, '')} Royal`} 
                  image={item.image}
                  material={item.karat}
                  weight={item.weight}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
            <p className="text-[#001b44] font-black uppercase tracking-[0.3em] text-[10px] opacity-30">
              New {category} Collection Arriving Soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;