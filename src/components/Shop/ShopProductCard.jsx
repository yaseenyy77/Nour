import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const ShopProductCard = ({ name, image, material, weight, manufacturer, category, viewMode }) => {
  const isListView = viewMode === 1;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    /* الكارد بدون p-5 عشان الصورة تكون كبيرة وتملأ العرض */
    <div className={`relative bg-white border border-gray-100 group transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:-translate-y-2 ${
        isListView ? 'flex flex-col md:flex-row items-center gap-0 overflow-hidden' : 'flex flex-col'
      }`}>
      
      {/* 1. منطقة الصورة - الأبعاد الأصلية [1/1] وبدون مسافات داخلية */}
      <div className={`relative bg-[#f8f8f8] shrink-0 overflow-hidden ${
        isListView ? 'w-full md:w-[45%] aspect-square' : 'w-full aspect-[1/1]'
      }`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* العيار فوق الصورة */}
        <div className="absolute top-0 left-0 bg-[#001b44] text-[#d4af37] px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] z-10">
          {material || "24K Gold"}
        </div>

        {/* أيقونة المفضلة (القلب) */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
          className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm transition-all hover:scale-110"
        >
          <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
        </button>
      </div>

      {/* 2. منطقة تفاصيل المنتج - هنا الـ Padding مخصص للنص فقط */}
      <div className={`flex flex-col flex-1 w-full p-6 ${
        isListView ? 'md:p-12 items-start text-left justify-center' : 'items-center text-center'
      }`}>
        
        <span className="text-[#001b44] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">
          {manufacturer || "Nour Excellence"}
        </span>

        <h3 className={`text-[#001b44] font-black uppercase tracking-tighter leading-tight mb-2 group-hover:text-[#d4af37] transition-colors ${
          isListView ? 'text-2xl md:text-3xl' : 'text-lg'
        }`}>
          {name}
        </h3>

        {/* عرض الجرامات والعيار (بدل السعر) */}
        <p className="text-[#001b44] text-[13px] md:text-[14px] font-black uppercase">
          {weight} G — {material || "21K"}
        </p>

        {isListView && (
          <p className="text-gray-500 text-sm mt-6 mb-8 max-w-md leading-relaxed">
            Premium crafted {category} piece, featuring exquisite details and a timeless finish.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;