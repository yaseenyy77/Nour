import React from 'react';

const HeroContent = () => {
  return (
    <div className="container mx-auto px-6 md:px-16 flex flex-col items-center justify-center text-center">
      {/* اللوجو - حجم أصغر للموبايل وحجم ملكي للديسكتوب */}
      <div className="w-24 md:w-40 mb-8 opacity-90 transition-all hover:scale-105">
       
       
      </div>

      {/* التيكست - أحجام خطوط متناسقة مع الموبايل */}
      <div className="space-y-4 max-w-xl mx-auto">
        <span className="text-[#d4af37] text-[10px] md:text-xs font-black tracking-[0.5em] uppercase block">
          Luxury Redefined
        </span>
        <h1 className="text-white text-3xl md:text-6xl font-serif italic leading-tight">
          Eternal Elegance
        </h1>
        <div className="w-16 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
      </div>
    </div>
  );
};

export default HeroContent;