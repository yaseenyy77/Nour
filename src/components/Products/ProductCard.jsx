import React from 'react';

const ProductCard = ({ name, weight, karat, img }) => {
  return (
    <div className="group cursor-pointer w-full bg-white flex flex-col">
      {/* حاوية الصورة - خلفية فاتحة جداً وهامش بسيط */}
      <div className="relative aspect-[3/4] bg-[#f9f9f9] overflow-hidden">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* تفاصيل المنتج - محاذاة لليسار وخطوط واضحة */}
      <div className="py-4 px-2 flex flex-col gap-1">
        <h3 className="text-[11px] md:text-[13px] font-bold uppercase tracking-tight text-black">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] md:text-[12px] font-medium text-gray-900">
            {karat} Karat
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-[10px] md:text-[12px] font-medium text-gray-900">
            {weight}g
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;