// src/components/Hero/HeroContent.jsx
import React from 'react';

const HeroContent = () => {
  return (
    <div className="relative z-10 max-w-2xl text-left px-12 md:px-24 select-none">
      <h2 className="text-[#d4af37] tracking-[0.4em] text-sm uppercase mb-4 font-medium animate-pulse">
        The Essence of Royal Elegance
      </h2>
      
      <h1 className="text-white text-5xl md:text-7xl font-serif leading-tight mb-6 tracking-tight">
        Crafting Your <br /> 
        <span className="text-[#d4af37]">Golden Legacy</span>
      </h1>
      
      <p className="text-white/80 text-lg mb-10 font-light max-w-md leading-relaxed">
        Discover our exclusive collection of 24k gold jewelry, inspired by ancient heritage and modern luxury.
      </p>

      <button className="bg-[#d4af37] text-black px-12 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white hover:scale-105 transition-all duration-300">
        Shop Collection
      </button>
    </div>
  );
};

export default HeroContent;