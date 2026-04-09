import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowUpRight, ShieldCheck, Weight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const ShopProductCard = (product) => {
  // التعديل هنا: استخدام karat بدلاً من material، و brand بدلاً من manufacturer ليتطابق مع الداش بورد
  const { id, name, image, karat, weight, brand, category, viewMode } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isFavorite = favorites.some(item => item.id === id);
  const isListView = viewMode === 1;

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`group relative bg-white overflow-hidden transition-all duration-700 cursor-pointer ${
        isListView 
          ? 'flex flex-col md:flex-row items-center border-b border-gray-100 hover:bg-[#fcfaf2]' 
          : 'flex flex-col border border-gray-50 hover:shadow-[0_30px_60px_-15px_rgba(0,27,68,0.08)]'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#f8f8f8] ${
        isListView ? 'w-full md:w-[40%] aspect-square' : 'w-full aspect-[1/1]'
      }`}>
        <img 
          src={image || "https://via.placeholder.com/400?text=Nour+Gold"} // صورة احتياطية لو الرابط فاضي
          alt={name} 
          className="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-[1.5s] group-hover:scale-110" 
        />
        
        <div className="absolute top-0 left-0 bg-[#001b44] text-[#d4af37] px-5 py-2 font-black text-[10px] uppercase tracking-[0.3em] z-10">
          عيار {karat}
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
          className="absolute top-5 right-5 z-20 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full transition-all duration-500 hover:bg-white"
        >
          <Heart size={18} className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className={`flex flex-col flex-1 p-8 md:p-10 ${isListView ? 'items-start text-left' : 'items-center text-center'}`}>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#d4af37]/30"></span>
          <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.4em]">
            {brand || "نور للذهب"}
          </span>
          <span className="w-8 h-[1px] bg-[#d4af37]/30"></span>
        </div>

        <h3 className={`text-[#001b44] font-black uppercase italic tracking-tighter mb-6 group-hover:text-[#d4af37] transition-colors ${
          isListView ? 'text-3xl md:text-5xl' : 'text-xl md:text-2xl'
        }`}>
          {name}
        </h3>

        <div className={`grid grid-cols-2 w-full gap-6 border-t border-gray-100 pt-8 mt-auto ${isListView ? 'max-w-md' : ''}`}>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400">
              <Weight size={12} />
              <span className="text-[8px] uppercase tracking-widest font-bold">الوزن</span>
            </div>
            <span className="text-[#001b44] font-black text-sm">{weight} جرام</span>
          </div>
          
          <div className="flex flex-col gap-1 border-l border-gray-100 pl-6">
            <div className="flex items-center gap-2 text-gray-400">
              <ShieldCheck size={12} />
              <span className="text-[8px] uppercase tracking-widest font-bold">الفئة</span>
            </div>
            <span className="text-[#001b44] font-black text-sm">{category}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border-[0.5px] border-transparent group-hover:border-[#d4af37]/30 transition-all pointer-events-none" />
    </div>
  );
};

export default ShopProductCard;