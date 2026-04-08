import React from 'react';
import { motion } from 'framer-motion';

const ShopProductCard = ({ name, image, material, weight, manufacturer, category }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col bg-white border border-gray-100 group hover:shadow-2xl transition-all duration-500 h-full"
    >
      {/* 1. منطقة الصورة والعيار */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f8f8f8]">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover mix-blend-multiply opacity-95 transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* العيار (مثلاً: عيار 21) */}
        <div className="absolute top-0 left-0 bg-[#001b44] text-[#d4af37] px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] border-b border-r border-[#d4af37]/40 shadow-lg">
          {material || "24K Gold"}
        </div>

        {/* زر السلة */}
        <div className="absolute inset-0 bg-[#001b44]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <button className="bg-[#d4af37] text-[#001b44] px-6 py-2.5 font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl">
             Add to Bag
           </button>
        </div>
      </div>

      {/* 2. منطقة تفاصيل المنتج (المواصفات فقط) */}
      <div className="p-5 flex flex-col items-center text-center flex-1">
        
        {/* الشركة المصنعة (Manufacturer) */}
        <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.4em] mb-2">
          {manufacturer || "Nour Excellence"}
        </span>

        {/* الاسم (Name) */}
        <h3 className="text-[#001b44] text-lg font-black italic uppercase tracking-tighter mb-4 leading-tight">
          {name}
        </h3>

        {/* تفاصيل الجرامات والعيار (Specifications) */}
        <div className="w-full grid grid-cols-2 gap-2 mt-auto">
          <div className="bg-[#fcfaf2] py-2 border border-[#d4af37]/10">
            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Weight</p>
            <p className="text-[#001b44] text-xs font-black">{weight || "0.00"} <span className="text-[9px]">G</span></p>
          </div>
          <div className="bg-[#fcfaf2] py-2 border border-[#d4af37]/10">
            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Category</p>
            <p className="text-[#001b44] text-xs font-black">{category || "Gold"}</p>
          </div>
        </div>

        {/* اللمسة الفرعونية النهائية */}
        <div className="mt-5 flex items-center gap-2">
          <div className="w-4 h-[1px] bg-[#d4af37]"></div>
          <div className="w-1.5 h-1.5 bg-[#001b44] rotate-45"></div>
          <div className="w-4 h-[1px] bg-[#d4af37]"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopProductCard;