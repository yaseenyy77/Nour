import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Wishlist = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-[#001b44] text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Your <span className="text-[#d4af37]">Favorites</span>
          </h1>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {favorites.map((item) => (
              <div key={item.id} className="group relative bg-[#fcfaf2] border border-[#d4af37]/10 p-4 transition-all hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden bg-white mb-6">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-4 right-4 p-2 bg-white text-red-500 shadow-md hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="text-left px-2">
                  <h3 className="text-[#001b44] font-black uppercase italic text-xl mb-2">{item.name}</h3>
                  <div className="flex gap-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-6">
                    <span>{item.weight} G</span>
                    <span className="text-[#d4af37]">|</span>
                    <span>{item.material}</span>
                  </div>
                  <Link to="/shop" className="flex items-center justify-between w-full border-t border-[#d4af37]/20 pt-4 text-[#001b44] font-black uppercase text-[10px] tracking-[0.2em]">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={80} className="text-gray-100 mb-6" />
            <h2 className="text-[#001b44] text-2xl font-bold uppercase mb-4">Your list is empty</h2>
            <Link to="/shop" className="bg-[#001b44] text-white px-12 py-4 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#d4af37]">
              Go To Shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;