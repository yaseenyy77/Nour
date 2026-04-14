import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useInventory } from '../hooks/useSliders'; // استيراد الهوك الخاص بالمنتجات

const Wishlist = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { data: products, isLoading } = useInventory();

  // 🔄 منطق المزامنة: حذف المنتجات التي لم تعد موجودة في المتجر
  useEffect(() => {
    if (!isLoading && products && favorites.length > 0) {
      favorites.forEach(favItem => {
        // التأكد من وجود المنتج في قائمة المنتجات الحالية من السيرفر
        const exists = products.some(p => String(p.id) === String(favItem.id));
        if (!exists) {
          removeFromFavorites(favItem.id);
        }
      });
    }
  }, [products, isLoading, favorites, removeFromFavorites]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Syncing Your Vault...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-16 relative">
          <h1 className="text-[#001b44] text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 relative z-10">
            Your <span className="text-[#d4af37]">Luxury</span> List
          </h1>
          <div className="w-24 h-1.5 bg-[#d4af37] mx-auto"></div>
          <p className="mt-4 text-gray-400 font-medium uppercase tracking-[0.3em] text-[10px]">Exclusive Collection</p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {favorites.map((item) => (
              <div key={item.id} className="group relative bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl">
                {/* Product Image */}
                <div className="aspect-[4/5] overflow-hidden bg-[#f9f9f9] relative p-8">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Quick Action: Remove */}
                  <button 
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    title="Remove from list"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-8 text-left">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[9px] text-[#d4af37] font-black uppercase tracking-[0.3em] mb-1">{item.material || "Gold Purity"}</p>
                      <h3 className="text-[#001b44] text-xl font-bold uppercase tracking-tight leading-none group-hover:text-[#d4af37] transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-lg font-light text-gray-400 italic">{item.weight}g</p>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <Link 
                      to={`/product/${item.id}`} 
                      className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001b44] hover:text-[#d4af37] transition-colors flex items-center gap-2"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-center bg-white border border-gray-100">
            <div className="relative mb-8">
                <Heart size={100} className="text-gray-50" />
                <ShoppingBag size={40} className="text-[#d4af37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-[#001b44] text-3xl font-black uppercase italic mb-2">Your list is waiting</h2>
            <p className="text-gray-400 max-w-xs mb-10 text-sm leading-relaxed uppercase tracking-widest">It seems you haven't added any luxury pieces to your favorites yet.</p>
            <Link to="/shop" className="group flex items-center gap-3 bg-[#001b44] text-white px-14 py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#d4af37] transition-all">
              Go To Shop <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;