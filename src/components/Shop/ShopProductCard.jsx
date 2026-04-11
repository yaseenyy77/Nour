import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowUpRight } from 'lucide-react'; 
import { useFavorites } from '../../context/FavoritesContext'; // المسار الصحيح للكارت

const ShopProductCard = (product) => {
  const { id, name, image, karat, weight, viewMode, brand } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isListView = viewMode === 1;
  const isFavorite = favorites.some(item => item.id === id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite({ id, name, image, weight, material: karat });
  };

  return (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className={`group relative bg-white transition-all duration-500 cursor-pointer rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] ${
        isListView ? 'flex flex-row items-center p-4' : 'flex flex-col'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#fdfdfd] ${isListView ? 'w-1/4 rounded-2xl' : 'w-full aspect-[4/5]'}`}>
        <img src={image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={name} />
        
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-3 rounded-full shadow-xl transition-all duration-300 z-10 backdrop-blur-md
            ${isFavorite ? 'bg-white opacity-100' : 'bg-white/80 opacity-0 group-hover:opacity-100 hover:scale-110'}`}
        >
          <Heart size={18} className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#001b44]'}`} />
        </button>
      </div>

      <div className={`flex-1 flex flex-col items-start ${isListView ? 'pl-8 py-2' : 'p-8'}`}>
        <span className="text-[9px] text-[#d4af37] font-black uppercase tracking-[0.2em] mb-1">{brand || "Exclusive Collection"}</span>
        <h3 className="text-[#001b44] font-black uppercase italic tracking-tighter text-xl group-hover:text-[#d4af37] transition-colors mb-6">{name}</h3>
        
        <div className="grid grid-cols-2 w-full gap-0 border-t border-gray-50 pt-6">
          <div className="flex flex-col border-r border-gray-50 pr-4">
            <span className="text-[8px] text-gray-400 uppercase font-black mb-1">Weight</span>
            <span className="text-[#001b44] font-black text-sm">{weight}g</span>
          </div>
          <div className="flex flex-col pl-6">
            <span className="text-[8px] text-gray-400 uppercase font-black mb-1">Karat</span>
            <span className="text-[#001b44] font-black text-sm">{karat}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;