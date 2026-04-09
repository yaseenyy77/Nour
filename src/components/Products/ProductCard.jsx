import React from 'react';
import { Heart } from 'lucide-react';

const ShopProductCard = ({ name, image, material, weight, manufacturer, viewMode }) => {
  const isListView = viewMode === 1;

  return (
    <div className={`group bg-white border border-gray-100 transition-all duration-300 ${
      isListView ? 'flex flex-row items-center p-6 gap-8' : 'flex flex-col'
    }`}>
      
      {/* 1. منطقة الصورة - تم حذف تاق العيار من هنا بناءً على طلبك */}
      <div className={`relative bg-[#f5f5f5] overflow-hidden ${
        isListView ? 'w-[200px] h-[250px]' : 'w-full aspect-[4/5]'
      }`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
        />
        
        {/* زر المفضلة - يظهر عند الهوفر */}
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-400 hover:text-red-500">
          <Heart size={18} />
        </button>
      </div>

      {/* 2. منطقة التفاصيل - الخطوط والتنسيق من الصورة */}
      <div className={`flex flex-col p-5 ${isListView ? 'flex-1 items-start text-left' : 'items-start text-left'}`}>
        
        {/* اسم المنتج - خط تخين وأسود صريح */}
        <h3 className="text-[14px] font-black text-black uppercase tracking-tight mb-1.5 leading-tight">
          {name}
        </h3>

        {/* الجرامات والعيار - مكان السعر في الصورة */}
        <div className="flex items-center gap-1.5 font-bold text-[13px] text-black">
          <span>{weight || "0.00"} G</span>
          <span className="text-gray-300">—</span>
          <span>{material || "21K"}</span>
        </div>

        {/* الماركة بخط صغير */}
        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2 font-medium">
          {manufacturer || "Nour Excellence"}
        </p>

        {/* زر سلة الشراء لو في وضع القائمة */}
        {isListView && (
          <button className="mt-6 bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-colors">
            Add to Bag
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;