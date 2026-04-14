import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ShieldCheck, Scale, HeartOff } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useInventory } from "../hooks/useSliders";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading } = useInventory();
  const { favorites, toggleFavorite } = useFavorites();
  
  // حالات التحكم في معرض الصور والـ Zoom
  const [activeImage, setActiveImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');

  // البحث عن المنتج
  const product = products?.find((p) => p.id === id || p.id === Number(id));
  const isFavorite = favorites?.some(item => item.id === product?.id);

  // تجهيز مصفوفة الصور (سواء كانت صورة واحدة أو عدة صور من الفورم)
  const gallery = product?.images?.length > 0 ? product.images : (product?.image ? [product.image] : []);

  // تعيين الصورة الأساسية عند تحميل المنتج
  useEffect(() => {
    if (gallery.length > 0) {
      setActiveImage(gallery[0]);
    }
  }, [product]);

  // دالة التعامل مع حركة الماوس لعمل الـ Zoom
  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#d4af37]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-400 mb-4">PIECE NOT FOUND</h2>
      <button onClick={() => navigate(-1)} className="text-[#d4af37] font-bold flex items-center gap-2 uppercase tracking-widest text-sm hover:text-black transition-colors">
        <ArrowLeft size={20} /> Return to Shop
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* زر الرجوع */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-black transition-all font-bold text-[10px] uppercase tracking-widest"
      >
        <ArrowLeft size={14} /> Back to Collection
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* قسم الصور (المعرض + الزوم) */}
        <div className="flex flex-col gap-6">
          {/* الصورة الرئيسية */}
          <div 
            className="relative bg-[#fafafa] rounded-none lg:rounded-[2rem] overflow-hidden p-8 flex items-center justify-center aspect-[4/5] md:aspect-square md:h-[550px] cursor-crosshair group border border-transparent hover:border-gray-100 transition-colors"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={activeImage} 
              alt={product.name} 
              // تطبيق الـ Zoom مع تحويل الأصل (Origin) حسب حركة الماوس
              className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-200 ease-out will-change-transform ${isZoomed ? 'scale-[2.2]' : 'scale-100'}`}
              style={{ transformOrigin: zoomOrigin }}
            />
            
            {/* زر القلب */}
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
              className={`absolute top-6 right-6 p-4 rounded-full shadow-sm transition-all duration-300 z-10 ${
                isFavorite 
                  ? 'bg-red-50 opacity-100 scale-110' 
                  : 'bg-white/80 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white'
              }`}
            >
              <Heart size={20} className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-[#001b44]'}`} />
            </button>
            
            {/* تظليل سفلي ناعم */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}></div>
          </div>

          {/* المصغرات (Gallery Thumbnails) - تظهر فقط إذا كان هناك أكثر من صورة */}
          {gallery.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-2 custom-scrollbar hide-scrollbar">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-[#fafafa] border-2 transition-all duration-300 ${
                    activeImage === img ? 'border-[#d4af37] shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-contain mix-blend-multiply p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* قسم المعلومات (اليمين) */}
        <div className="flex flex-col pt-4 lg:pt-10">
          <span className="text-[#d4af37] font-semibold uppercase tracking-[0.4em] text-[11px] mb-4">
            {product.brand || product.manufacturer || "Royal Collection"}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#001b44] uppercase tracking-tighter leading-none mb-8">
            {product.name}
          </h1>

          <div className="w-12 h-[2px] bg-[#d4af37] mb-10"></div>

          <p className="text-sm text-gray-500 leading-relaxed mb-12 max-w-lg">
            A masterpiece of design and craftsmanship. Carefully forged to perfection, ensuring elegance in every detail. Every piece comes with an official certificate of authenticity.
          </p>

          {/* بيانات المواصفات (تصميم بسيط وشيك) */}
          <div className="flex items-center gap-16 py-10 border-t border-gray-100 mb-12">
            {product.weight && (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center gap-2">
                  <Scale size={12} /> Weight
                </p>
                <div className="text-[#001b44] font-medium text-2xl flex items-baseline gap-1">
                  {product.weight} <span className="text-sm text-gray-400 font-normal">Grams</span>
                </div>
              </div>
            )}
            
            {product.karat && (
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center gap-2">
                  <ShieldCheck size={12} /> Purity
                </p>
                <div className="text-[#001b44] font-medium text-2xl">
                  {product.karat}
                </div>
              </div>
            )}
          </div>

          {/* الزرار (تم الاحتفاظ به وتنسيقه ليلائم التصميم الجديد) */}
          <div className="flex w-full md:w-3/4">
            <button 
              onClick={() => toggleFavorite(product)}
              className={`w-full py-5 font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-500 flex items-center justify-center gap-3 active:scale-[0.98] ${
                isFavorite 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-[#001b44] text-white hover:bg-[#d4af37]'
              }`}
            >
              {isFavorite ? <HeartOff size={16} /> : <Heart size={16} />}
              {isFavorite ? 'Remove From Vault' : 'Add To Vault'}
            </button>
          </div>
        </div>

      </div>

      {/* لإخفاء الـ scrollbar للمصغرات مع الاحتفاظ بقدرة السحب */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default ProductDetails;