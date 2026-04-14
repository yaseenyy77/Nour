import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react'; 
import { useFavorites } from '../../context/FavoritesContext';

const ShopProductCard = (product) => {
  const { id, name, image, karat, weight, viewMode, brand, badge } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isSingleColumn = viewMode === 1; 
  const isFavorite = favorites.some(item => item.id === id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite({ id, name, image, weight, material: karat });
  };

  // 🌟 1. تصميم العمود الواحد (صورة يسار، تفاصيل يمين - ستايل المجلات الراقية)
  const renderSingleColumnView = () => (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className="group flex flex-col md:flex-row bg-white border border-gray-100 cursor-pointer transition-shadow duration-500 hover:shadow-xl w-full"
    >
      {/* قسم الصورة (اليسار) */}
      <div className="relative w-full md:w-[45%] bg-[#f9f9f9] overflow-hidden shrink-0 aspect-[4/5] md:aspect-auto md:min-h-[450px]">
        {badge && (
          <div className="absolute top-5 left-5 z-10 bg-[#001b44] text-white text-[10px] uppercase tracking-widest px-3 py-1.5">
            {badge}
          </div>
        )}
        <img 
          src={image} 
          className="absolute inset-0 w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-105" 
          alt={name} 
        />
      </div>

      {/* قسم المعلومات (اليمين) */}
      <div className="flex flex-col justify-center flex-1 p-8 md:p-16 text-left relative">
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-8 right-8 z-10 p-2"
        >
          <Heart size={24} className={`transition-all duration-500 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-[#001b44]'}`} />
        </button>

        <span className="text-[11px] text-[#d4af37] font-semibold uppercase tracking-[0.3em] mb-4">{brand || "Royal Collection"}</span>
        
        <h3 className="text-3xl md:text-4xl font-light text-[#001b44] uppercase tracking-wide leading-tight mb-6">
          {name}
        </h3>

        <div className="w-10 h-[1px] bg-[#d4af37] mb-6"></div>

        <p className="text-sm text-gray-500 leading-relaxed max-w-md mb-12 hidden md:block">
          A masterpiece of design and craftsmanship. Carefully forged to perfection, ensuring elegance in every detail.
        </p>

        <div className="flex items-center gap-12">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Weight</p>
            <p className="text-xl text-[#001b44] font-medium">{weight} <span className="text-xs text-gray-400 font-normal">Grams</span></p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Purity</p>
            <p className="text-xl text-[#001b44] font-medium">{karat}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // 🌟 2. تصميم الشبكة (Grid View - بسيط، حاد، يركز على الصورة)
  const renderGridView = () => (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className="group flex flex-col cursor-pointer bg-white h-full"
    >
      {/* قسم الصورة - مساحة أكبر وخلفية هادئة */}
      <div className="relative aspect-[4/5] w-full bg-[#f9f9f9] overflow-hidden mb-4 border border-transparent group-hover:border-gray-100 transition-colors duration-500">
        
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#001b44] text-white text-[9px] uppercase tracking-widest px-2 py-1">
            {badge}
          </div>
        )}

        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2"
        >
          <Heart size={18} className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 group-hover:text-[#001b44]'}`} />
        </button>

        <img 
          src={image} 
          className="w-full h-full object-contain p-8 transition-transform duration-1000 group-hover:scale-105" 
          alt={name} 
        />
      </div>

      {/* قسم المعلومات - نظيف وبدون زحمة */}
      <div className="flex flex-col text-left px-1">
        <span className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1.5">{brand || "Royal Collection"}</span>
        
        <h3 className="text-sm font-medium text-[#001b44] uppercase tracking-wide truncate mb-2.5">
          {name}
        </h3>

        <div className="flex items-center gap-2 text-[11px] text-gray-500 uppercase tracking-widest mt-auto">
          <span className="font-medium text-[#001b44]">{karat}</span>
          <span className="w-1 h-1 bg-[#d4af37] rounded-full"></span>
          <span>{weight} G</span>
        </div>
      </div>
    </div>
  );

  return isSingleColumn ? renderSingleColumnView() : renderGridView();
};

export default ShopProductCard;