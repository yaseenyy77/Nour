import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowUpRight, ShieldCheck, Weight } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

const ShopProductCard = (product) => {
  // تظبيط الأسماء لترتبط بالداتابيز صح (karat بدل material)
  const { id, name, image, karat, weight, brand, category, viewMode } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isFavorite = favorites.some(item => item.id === id);
  const isListView = viewMode === 1;

  return (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className={`group relative bg-white overflow-hidden transition-all duration-700 cursor-pointer ${
        isListView ? 'flex flex-row items-center border-b border-gray-100' : 'flex flex-col border border-gray-50'
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#f8f8f8] ${isListView ? 'w-1/3' : 'w-full aspect-[4/5]'}`}>
        <img src={image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      </div>

      <div className="flex-1 p-8 flex flex-col items-start text-left">
        <h3 className="text-[#001b44] font-black uppercase italic tracking-tighter text-xl mb-4">{name}</h3>
        
        <div className="grid grid-cols-2 w-full gap-4 border-t border-gray-100 pt-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-400 uppercase font-bold">الوزن</span>
            <span className="text-[#001b44] font-black text-sm">{weight}g</span>
          </div>
          <div className="flex flex-col border-l border-gray-100 pl-4">
            <span className="text-[8px] text-gray-400 uppercase font-bold">العيار</span>
            <span className="text-[#001b44] font-black text-sm">{karat}K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;