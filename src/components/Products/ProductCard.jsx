import React from 'react';

const ProductCard = ({ title, karat, weight, image }) => {
  return (
    <div className="group cursor-pointer flex flex-col w-full">
      
      {/* حاوية الصورة */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-3">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
          <button className="bg-white text-black text-[10px] font-bold py-2 px-6 uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>

      {/* تفاصيل المنتج بدون السعر */}
      <div className="flex flex-col space-y-1">
        <h3 className="text-[11px] md:text-[13px] font-black uppercase tracking-tight text-black line-clamp-1">
          {title}
        </h3>
        
        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
          <span>{karat}</span>
          <span className="w-[1px] h-3 bg-gray-200"></span>
          <span>{weight}</span>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;