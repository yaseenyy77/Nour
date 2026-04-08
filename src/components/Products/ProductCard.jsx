import React from 'react';

const ShopProductCard = ({ name, image, material, weight, manufacturer, category, viewMode }) => {
  // التحقق مما إذا كان وضع العرض هو القائمة الأفقية (زر رقم 1)
  const isListView = viewMode === 1;

  return (
    // Motion removed, hover effects removed
    <div className={`relative flex bg-white border border-gray-100 ${
        isListView ? 'flex-row items-center gap-8 p-6' : 'flex-col p-5'
      }`}>
      
      {/* 1. منطقة الصورة والعيار */}
      <div className={`relative overflow-hidden bg-[#f8f8f8] shrink-0 ${
        isListView ? 'w-[200px] h-[250px]' : 'w-full aspect-[3/4] mb-4'
      }`}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover mix-blend-multiply opacity-95" 
        />
        
        {/* العيار (مثلاً: عيار 21) */}
        <div className="absolute top-0 left-0 bg-[#001b44] text-[#d4af37] px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.2em] border-b border-r border-[#d4af37]/40 shadow-lg">
          {material || "24K Gold"}
        </div>
      </div>

      {/* 2. منطقة تفاصيل المنتج (أفقية تماماً في وضع القائمة) */}
      <div className={`flex flex-col ${
        isListView ? 'items-start text-left flex-1' : 'items-center text-center'
      }`}>
        
        {/* الشركة المصنعة (Manufacturer) */}
        <span className="text-[#d4af37] text-[9px] font-black uppercase tracking-[0.4em] mb-2">
          {manufacturer || "Nour Excellence"}
        </span>

        {/* الاسم (Name) */}
        <h3 className={`text-[#001b44] font-black italic uppercase tracking-tighter leading-tight ${
          isListView ? 'text-2xl mb-6' : 'text-lg mb-4'
        }`}>
          {name}
        </h3>

        {/* تفاصيل الجرامات والعيار (Specifications) */}
        <div className={`grid gap-2 ${
          isListView ? 'grid-cols-2 w-auto' : 'grid-cols-2 w-full mt-auto'
        }`}>
          <div className="bg-[#fcfaf2] py-2 px-4 border border-[#d4af37]/10 flex flex-col items-center justify-center">
            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Weight</p>
            <p className="text-[#001b44] text-xs font-black">{weight || "0.00"} <span className="text-[9px]">G</span></p>
          </div>
          <div className="bg-[#fcfaf2] py-2 px-4 border border-[#d4af37]/10 flex flex-col items-center justify-center">
            <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Category</p>
            <p className="text-[#001b44] text-xs font-black">{category || "Gold"}</p>
          </div>
        </div>

        {/* اللمسة الفرعونية النهائية (مخفية في وضع القائمة) */}
        <div className={`mt-5 flex items-center gap-2 ${isListView ? 'hidden' : 'flex'}`}>
          <div className="w-4 h-[1px] bg-[#d4af37]"></div>
          <div className="w-1.5 h-1.5 bg-[#001b44] rotate-45"></div>
          <div className="w-4 h-[1px] bg-[#d4af37]"></div>
        </div>

        {/* زر السلة (يظهر كزر عادي في وضع القائمة) */}
        {isListView && (
          <button className="bg-[#d4af37] text-[#001b44] px-8 py-3 font-black uppercase text-[11px] tracking-[0.3em] mt-8 shadow-md">
            Add to Bag
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;