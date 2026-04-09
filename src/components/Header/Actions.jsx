import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiHeart } from 'react-icons/fi';
import { useFavorites } from '../../context/FavoritesContext';

const Actions = () => {
  const { favorites } = useFavorites();

  return (
    <div className="flex items-center gap-5 text-black">
      <FiSearch className="text-xl cursor-pointer hover:text-[#d4af37] transition-all duration-300" />
      <FiUser className="text-xl cursor-pointer hover:text-[#d4af37] transition-all duration-300" />
      
      <Link to="/wishlist" className="relative cursor-pointer group">
        <FiHeart className={`text-2xl transition-all duration-300 ${favorites.length > 0 ? 'text-red-500 fill-red-500' : 'group-hover:text-red-500'}`} />
        {favorites.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
            {favorites.length}
          </span>
        )}
      </Link>
    </div>
  );
};

export default Actions;