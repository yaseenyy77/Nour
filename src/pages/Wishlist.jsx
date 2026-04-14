import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Wishlist = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-[#001b44] text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 relative z-10">
            Your <span className="text-[#d4af37]">Luxury</span> List
          </h1>
          <div className="w-24 h-1.5 bg-[#d4af37] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">Exclusive Collection</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {favorites.map((item) => (
              <div key={item.id} className="group relative bg-white border border-gray-100 p-0 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-2xl overflow-hidden">
                
                {/* Image Container */}
                <div className="relative aspect-[1/1] overflow-hidden bg-[#fdfdfd] group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" 
                  />
                  
                  {/* زرار الحذف - تعديل: جعله ظاهراً دائماً */}
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-6 right-6 z-10 p-3 bg-white text-red-500 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="absolute inset-0 bg-[#001b44]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Section */}
                <div className="p-8 text-center">
                  <div className="mb-2">
                    <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-[0.2em]">Product Category</span>
                    <h3 className="text-[#001b44] font-black uppercase italic text-2xl mt-1">{item.name}</h3>
                  </div>

                  {/* Specs Grid */}
                  <div className="flex items-center justify-center gap-6 my-6 border-y border-gray-50 py-4">
                    <div className="text-center">
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Weight</p>
                      <p className="text-[#001b44] font-black text-sm">{item.weight}G</p>
                    </div>
                    <div className="w-[1px] h-8 bg-gray-100"></div>
                    <div className="text-center">
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Karat</p>
                      <p className="text-[#001b44] font-black text-sm">{item.karat}K</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="flex-1 bg-[#001b44] text-white py-4 px-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-colors flex items-center justify-center gap-2 rounded-lg"
                    >
                      View Product <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="relative mb-8">
                <Heart size={100} className="text-gray-50" />
                <ShoppingBag size={40} className="text-[#d4af37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-[#001b44] text-3xl font-black uppercase italic mb-2">Your list is waiting</h2>
            <p className="text-gray-400 max-w-xs mb-10 text-sm leading-relaxed">It seems you haven't added any luxury pieces to your favorites yet.</p>
            <Link to="/shop" className="group flex items-center gap-3 bg-[#001b44] text-white px-14 py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#d4af37] transition-all shadow-xl shadow-[#001b44]/10 hover:shadow-[#d4af37]/20">
              Explore Shop <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;