import React from 'react';

const ProductCard = ({ name, weight, karat, company, img }) => {
  return (
    <div className="group cursor-pointer w-full bg-white">
      {/* الصورة ملتصقة تماماً بالحواف */}
      <div className="overflow-hidden aspect-[3/4] flex items-center justify-center relative">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* زرار صغير جداً يظهر عند التحويم */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
           <button className="bg-white text-[8px] font-bold uppercase tracking-widest py-2 px-4 shadow-xl">
             View
           </button>
        </div>
      </div>

      {/* تفاصيل المنتج مضغوطة جداً */}
      <div className="p-3 space-y-1 text-left">
        <div className="flex justify-between items-start">
          <h3 className="text-[10px] font-bold uppercase tracking-tighter text-black truncate w-2/3">
            {name}
          </h3>
          <span className="text-[9px] text-[#d4af37] font-black">{karat}K</span>
        </div>
        
        <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
          <span className="text-[9px] text-gray-400 font-medium">{weight}g</span>
          <span className="text-[7px] text-gray-300 uppercase tracking-widest truncate">{company}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;