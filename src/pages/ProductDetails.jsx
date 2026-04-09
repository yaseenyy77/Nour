import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, ShieldCheck, Truck, Weight, Layers } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
// تأكد من استيراد ملف البيانات الخاص بك
import { productsData } from '../data/productsData'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // أداة التنقل
  const { favorites, toggleFavorite } = useFavorites();

  // البحث عن المنتج بالـ ID
  const product = productsData.find(item => item.id === parseInt(id) || item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // دالة الرجوع للخلف
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1); // يرجعك لآخر صفحة كنت فيها
    } else {
      navigate('/shop'); // لو مفيش تاريخ رجوع يوديك الشوب
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-6">
        <h2 className="text-2xl font-bold text-[#001b44]">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="text-[#d4af37] font-bold underline">Back to Shop</button>
      </div>
    );
  }

  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* زرار الباك المعدل */}
        <button 
          onClick={handleBack} 
          className="flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition-all text-[10px] uppercase tracking-[0.4em] mb-16 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* صورة المنتج */}
          <div className="relative bg-[#fcfcfc] p-10 border border-gray-50 aspect-square flex items-center justify-center overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full h-auto object-contain mix-blend-multiply transition-transform duration-1000 hover:scale-110" 
            />
            <div className="absolute top-0 left-0 bg-[#001b44] text-[#d4af37] px-6 py-2 font-black text-[10px] uppercase tracking-widest">
              {product.material}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
               <span className="h-[1px] w-10 bg-[#d4af37]"></span>
               <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.5em]">{product.manufacturer || "Nour Gold"}</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#001b44] uppercase italic tracking-tighter leading-none mb-6">
              {product.name}
            </h1>
            
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12 max-w-lg">
               قطعة فريدة مصممة بعناية فائقة لتناسب ذوقك الرفيع. تعكس هذه المجموعة من {product.category} جمال الذهب الـ {product.material} الخالص بلمسات عصرية خالدة.
            </p>

            <div className="grid grid-cols-2 gap-12 border-y border-gray-100 py-10 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold">
                  <Layers size={14} /> Material
                </div>
                <p className="text-xl font-black text-[#001b44]">{product.material}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold">
                  <Weight size={14} /> Weight
                </div>
                <p className="text-xl font-black text-[#001b44]">{product.weight} G</p>
              </div>
            </div>

            <button 
              onClick={() => toggleFavorite(product)}
              className={`w-full py-5 flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-[0.3em] transition-all duration-500 border ${
                isFavorite 
                ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-200' 
                : 'bg-[#001b44] border-[#001b44] text-white hover:bg-transparent hover:text-[#001b44]'
              }`}
            >
              <Heart size={18} className={isFavorite ? 'fill-white' : ''} />
              {isFavorite ? 'In Your Favorites' : 'Add To Favorites'}
            </button>

            <div className="mt-12 pt-8 border-t border-gray-50 flex flex-wrap gap-8">
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <ShieldCheck size={16} className="text-[#d4af37]" /> Lifetime Warranty
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                <Truck size={16} className="text-[#d4af37]" /> Insured Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;