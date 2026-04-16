import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, ShieldCheck, Scale, HeartOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // لإضافة لمسة احترافية في التحريك
import { useFavorites } from "../context/FavoritesContext";
import { useInventory } from "../hooks/useSliders";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products, isLoading } = useInventory();
  const { favorites, toggleFavorite } = useFavorites();
  
  const imgContainerRef = useRef(null);
  const [activeImage, setActiveImage] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });

  const product = products?.find((p) => p.id === id || p.id === Number(id));
  const isFavorite = favorites?.some(item => item.id === product?.id);
  const gallery = product?.images?.length > 0 ? product.images : (product?.image ? [product.image] : []);

  useEffect(() => {
    if (gallery.length > 0) setActiveImage(gallery[0]);
  }, [product, gallery]);

  const handleMouseMove = (e) => {
    if (!imgContainerRef.current) return;
    const { left, top, width, height } = imgContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPerc = (x / width) * 100;
    const yPerc = (y / height) * 100;
    setZoomOrigin(`${xPerc}% ${yPerc}%`);

    const lensWidth = width / 2.5;
    const lensHeight = height / 2.5;
    let lx = Math.max(0, Math.min(x - lensWidth / 2, width - lensWidth));
    let ly = Math.max(0, Math.min(y - lensHeight / 2, height - lensHeight));

    setLensPos({ x: lx, y: ly, width: lensWidth, height: lensHeight });
    setBgPos({ x: (lx / (width - lensWidth)) * 100, y: (ly / (height - lensHeight)) * 100 });
  };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
      <div className="w-16 h-[1px] bg-[#d4af37] animate-pulse"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-[#fdfdfd] pt-28 pb-20 px-6 md:px-16 lg:px-32 font-light text-[#1a1a1a]"
    >
      {/* زر العودة الأنيق */}
      <motion.button 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        onClick={() => navigate(-1)}
        className="group mb-12 flex items-center gap-3 text-gray-400 hover:text-black transition-all duration-500 ease-out"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Back to Collection</span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
        
        {/* قسم الصور المطور */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-8 sticky top-32"
        >
          <div 
            ref={imgContainerRef}
            className="relative bg-white rounded-3xl overflow-hidden aspect-[4/5] flex items-center justify-center cursor-none group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-50"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            <img 
              src={activeImage} 
              alt={product?.name} 
              className={`w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-500 ease-out ${isHovering ? 'scale-[2] lg:scale-100' : 'scale-100'}`}
              style={{ transformOrigin: zoomOrigin }}
            />
            
            {/* عدسة الزوم الأنيقة */}
            <AnimatePresence>
              {isHovering && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="hidden lg:block absolute border border-[#d4af37]/30 bg-white/10 backdrop-blur-[1px] pointer-events-none rounded-sm"
                  style={{ left: lensPos.x, top: lensPos.y, width: lensPos.width, height: lensPos.height }}
                />
              )}
            </AnimatePresence>

            {/* زر المفضلة الزجاجي */}
            <button 
              onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
              className={`absolute top-8 right-8 p-4 rounded-full backdrop-blur-md transition-all duration-700 z-10 ${
                isFavorite ? 'bg-red-50 shadow-inner' : 'bg-white/40 shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white'
              }`}
            >
              <Heart size={18} className={`transition-all duration-500 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-[#1a1a1a]'}`} />
            </button>
          </div>

          {/* المصغرات بتنسيق أفقي نظيف */}
          {gallery.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-2 px-1 hide-scrollbar">
              {gallery.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-white border transition-all duration-500 ${
                    activeImage === img ? 'border-[#d4af37] shadow-lg translate-y-[-4px]' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain p-3 mix-blend-multiply" />
                </button>
              ))}
            </div>
          )}

          {/* المربع المكبر الجانبي المطور */}
          <AnimatePresence>
            {isHovering && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="hidden lg:block absolute top-0 left-[calc(100%+3rem)] w-full h-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] z-50 pointer-events-none border border-gray-50 overflow-hidden"
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundPosition: `${bgPos.x}% ${bgPos.y}%`,
                  backgroundSize: '250%',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* قسم التفاصيل (Pro Typography) */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col pt-6 lg:pt-16"
        >
          <span className="text-[#d4af37] font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">
            {product?.brand || "Royal Collection"}
          </span>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-[#1a1a1a] uppercase tracking-[-0.04em] leading-[0.9] mb-10">
            {product?.name}
          </h1>

          <div className="w-16 h-[1px] bg-[#d4af37]/40 mb-12"></div>

          <p className="text-[15px] text-gray-500 leading-[1.8] mb-16 max-w-md font-normal">
            A piece of timeless elegance, crafted with precision for those who appreciate the finer things. Each detail reflects a legacy of luxury and sophistication.
          </p>

          <div className="grid grid-cols-2 gap-12 py-12 border-y border-gray-100 mb-16">
            {product?.weight && (
              <div className="space-y-3">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                  <Scale size={12} className="text-[#d4af37]" /> Weight
                </p>
                <div className="text-[#1a1a1a] font-light text-3xl">
                  {product.weight}<span className="text-xs ml-1 font-medium text-gray-300">G</span>
                </div>
              </div>
            )}
            
            {product?.karat && (
              <div className="space-y-3">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em] flex items-center gap-2">
                  <ShieldCheck size={12} className="text-[#d4af37]" /> Purity
                </p>
                <div className="text-[#1a1a1a] font-light text-3xl">
                  {product.karat}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 w-full lg:w-4/5">
            <button 
              onClick={() => toggleFavorite(product)}
              className={`group relative overflow-hidden py-6 px-10 font-bold uppercase tracking-[0.3em] text-[11px] transition-all duration-700 ease-in-out shadow-sm active:scale-[0.97] ${
                isFavorite 
                ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                : 'bg-[#1a1a1a] text-white hover:bg-[#d4af37] hover:shadow-xl hover:shadow-[#d4af37]/20'
              }`}
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                {isFavorite ? <HeartOff size={16} /> : <Heart size={16} className="group-hover:scale-110 transition-transform" />}
                {isFavorite ? 'Remove From Vault' : 'Add To Vault'}
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&display=swap');
      `}} />
    </motion.div>
  );
};

export default ProductDetails;