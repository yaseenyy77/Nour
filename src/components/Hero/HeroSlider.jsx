import React from 'react';
// المسار ده متظبط بالملي:
// نطلع من Hero لـ components (..) 
// نطلع من components لـ src (..) 
// ندخل assets ثم images ثم الصورة
import lotusBg from "../../assets/images/lotus-bg-royal.png"; 

const HeroSlider = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img 
        src={lotusBg} 
        alt="Royal Lotus Background" 
        className="w-full h-full object-cover object-right md:object-center shadow-2xl"
      />
      {/* طبقة تظليل (Overlay) عشان النص الإنجليزي في HeroContent يظهر بوضوح */}
      <div className="absolute inset-0 bg-black/35"></div>
    </div>
  );
};

export default HeroSlider;