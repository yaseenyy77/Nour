import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react'; 
import { useFavorites } from '../../context/FavoritesContext'; // المسار الصحيح بناءً على هيكل ملفاتك

const ShopProductCard = ({ id, name, image, images = [], karat, weight, brand, viewMode }) => {
  const navigate = useNavigate();
  const { toggleFavorite, favorites } = useFavorites();
  
  // التحقق إذا كان المنتج في المفضلة
  const isFavorite = favorites.some(item => item.id === id);

  const allImages = [image, ...images].slice(0, 6);
  const [activeImage, setActiveImage] = useState(image);

  useEffect(() => {
    setActiveImage(image);
  }, [image]);

  const isListView = viewMode === 1;

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // منع الانتقال لصفحة المنتج عند الضغط على القلب
    toggleFavorite({ id, name, image, karat, weight, brand });
  };

  return (
    <div
      className={`group flex cursor-pointer transition-all duration-500 border-b border-transparent hover:border-gray-50 pb-4 ${
        isListView ? 'flex-row items-start gap-6 md:gap-12 py-8' : 'flex-col w-full'
      }`}
      onClick={() => navigate(`/product/${id}`)}
    >
      {/* 1. حاوية الصورة الأساسية */}
      <div className={`relative bg-[#f6f6f6] overflow-hidden transition-all duration-500 ${
        isListView 
        ? 'w-[150px] h-[150px] md:w-[300px] md:h-[300px] flex-shrink-0' 
        : 'aspect-square w-full mb-3'
      }`}>
        <img
          src={activeImage}
          alt={name}
          className="w-full h-full object-contain p-4 mix-blend-multiply transition-opacity duration-300"
        />

        {/* زر القلب العائم */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all group/heart"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${
              isFavorite 
              ? 'fill-red-500 text-red-500' 
              : 'text-[#001b44] group-hover/heart:text-red-500'
            }`} 
          />
        </button>
      </div>

      {/* 2. حاوية المعلومات والصور المصغرة */}
      <div className={`flex flex-col flex-1 ${isListView ? 'justify-start pt-2' : ''}`}>
        
        <div className="flex flex-col text-left">
          <h3 className={`font-medium text-[#111] leading-tight transition-all ${
            isListView ? 'text-xl md:text-2xl mb-1' : 'text-[16px]'
          }`}>
            {name}
          </h3>

          <p className={`text-[#707070] transition-all ${
            isListView ? 'text-base md:text-lg mb-4' : 'text-[15px] mt-1'
          }`}>
            {brand || "Nour Gold"}
          </p>

          <div className={`flex items-center gap-2 font-medium text-[#111] transition-all ${
            isListView ? 'text-lg md:text-xl mb-6' : 'text-[15px] mt-2'
          }`}>
            <span>{karat}</span>
            <span className="text-gray-300">|</span>
            <span>{weight} G</span>
          </div>
        </div>

        {/* شريط الصور المصغرة */}
        {allImages.length > 1 && (
          <div 
            className={`flex gap-2 overflow-x-auto no-scrollbar ${
              isListView ? 'mt-auto' : 'mb-3 order-first md:order-none' 
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveImage(img)}
                className={`bg-[#f6f6f6] flex-shrink-0 cursor-pointer overflow-hidden border transition-all ${
                  isListView ? 'w-[50px] h-[50px] md:w-[64px] md:h-[64px]' : 'w-[44px] h-[44px]'
                } ${
                  activeImage === img ? 'border-[#111]' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${name} thumbnail ${idx}`}
                  className="w-full h-full object-cover mix-blend-multiply p-1"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;