import React from 'react';
import logoImg from "../../assets/icons/logo.png"; 

const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <img 
        src={logoImg} 
        alt="Nour Jewellery" 
        className="h-12 w-auto object-contain" 
      />
      <div className="flex flex-col border-l border-[#d4af37] pl-3 text-[#d4af37] leading-none">
        <span className="font-bold tracking-widest text-lg uppercase">NOUR</span>
        <span className="text-[10px] text-right font-serif tracking-[0.2em] mt-1">JEWELLERY</span>
      </div>
    </div>
  );
};

export default Logo;