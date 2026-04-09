import React from 'react';
import { Link } from 'react-router-dom'; // استيراد Link للتنقل

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#000d1a]">
      
      {/* 1. الخلفية المتدرجة */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#001b44] via-[#000d1a] to-black opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* 2. المحتوى الرئيسي */}
      <div className="relative z-10 text-center px-6">
        
        <span className="text-[#d4af37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] mb-6 block">
          Established 2026
        </span>

        <h1 className="text-white text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">
          Pure <span className="text-[#d4af37]">Gold</span><br/>
          Pure <span className="italic font-light">Elegance</span>
        </h1>

        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-12 font-serif leading-relaxed tracking-wide">
          Experience the pinnacle of luxury with our hand-crafted jewelry pieces, 
          designed for those who appreciate the finer things in life.
        </p>

        {/* 3. زرار الشوب فقط - مربوط بمسار /shop */}
        <div className="flex items-center justify-center">
          <Link 
            to="/shop" 
            className="bg-[#d4af37] text-[#001b44] px-16 py-5 font-black uppercase text-[12px] tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      {/* سهم السكرول السفلي */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
      </div>

    </section>
  );
};

export default Hero;