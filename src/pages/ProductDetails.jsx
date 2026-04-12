import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ShieldCheck, Scale, HeartOff } from "lucide-react";
// تأكد من صحة مسار الـ Context
import { useFavorites } from "../context/FavoritesContext";
import { useInventory } from "../hooks/useSliders";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading } = useInventory();
  const { favorites, toggleFavorite } = useFavorites();
  
  // البحث عن المنتج
  const product = products?.find((p) => p.id === id || p.id === Number(id));
  const isFavorite = favorites?.some(item => item.id === product?.id);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#d4af37]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-400 mb-4">PIECE NOT FOUND</h2>
      <button onClick={() => navigate(-1)} className="text-[#d4af37] font-bold flex items-center gap-2">
        <ArrowLeft size={20} /> RETURN TO SHOP
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6 md:px-12 lg:px-24">
      {/* زر الرجوع */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-black transition-all font-bold text-[10px] uppercase tracking-widest"
      >
        <ArrowLeft size={14} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* قسم الصورة */}
        <div className="relative bg-[#fafafa] rounded-[2rem] overflow-hidden p-8 flex items-center justify-center aspect-square md:aspect-auto md:h-[550px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 hover:scale-105"
          />
          <button 
            onClick={() => toggleFavorite(product)}
            className={`absolute top-6 right-6 p-3.5 rounded-full shadow-lg transition-all active:scale-90 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-300'
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* قسم المعلومات */}
        <div className="flex flex-col pt-4">
          {product.manufacturer && (
            <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-[11px] mb-4">
              {product.manufacturer}
            </span>
          )}
          
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-tight mb-10">
            {product.name}
          </h1>

          {/* بيانات المواصفات */}
          <div className="grid grid-cols-2 gap-8 py-10 border-y border-gray-100 mb-12">
            {product.weight && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-black font-black text-2xl">
                  <Scale size={22} className="text-[#d4af37]" />
                  <span>{product.weight}G</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Net Weight</p>
              </div>
            )}
            
            {product.karat && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-black font-black text-2xl">
                  <ShieldCheck size={22} className="text-[#d4af37]" />
                  <span>{product.karat}</span>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Gold Purity</p>
              </div>
            )}
          </div>

          {/* الزرار الجديد: Add To Favorites */}
          <div className="flex gap-4">
            <button 
              onClick={() => toggleFavorite(product)}
              className={`flex-1 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[11px] transition-all flex items-center justify-center gap-3 active:scale-[0.98] border-2 ${
                isFavorite 
                ? 'border-red-500 bg-red-50 text-red-500 hover:bg-red-100' 
                : 'border-black bg-black text-white hover:bg-[#d4af37] hover:border-[#d4af37]'
              }`}
            >
              {isFavorite ? <HeartOff size={18} /> : <Heart size={18} />}
              {isFavorite ? 'Remove From Fav' : 'Add To Fav'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;