import React, { useState, useEffect, useRef } from 'react';
import { LayoutGrid, Maximize2, ListFilter } from 'lucide-react';

const ShopHeader = ({ totalProducts, viewMode, setViewMode, isFilterOpen, setIsFilterOpen }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false); // حالة للحجم الصغير
  const lastScrollY = useRef(0);

  useEffect(() => {
    const snapContainer = document.getElementById('snap-container');
    const handleScroll = () => {
      const currentScroll = snapContainer ? snapContainer.scrollTop : 0;

      // لو نزلنا أكتر من 50 بكسل، خليه Compact
      setIsCompact(currentScroll > 50);

      // منطق إخفاء وإظهار الناف بار الأساسي
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollY.current = currentScroll;
    };

    if (snapContainer) {
      snapContainer.addEventListener('scroll', handleScroll);
      return () => snapContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      className={`w-full bg-white/95 backdrop-blur-md px-6 md:px-16 border-b border-gray-100 flex items-center justify-between z-[90] sticky transition-all duration-500 ease-in-out ${
        isCompact ? 'py-2 shadow-sm' : 'py-6' 
      }`}
      style={{ 
        top: isNavbarVisible ? '70px' : '0px' 
      }}
    >
      {/* العنوان والعدد - الحجم بيتغير بناءً على السكرول */}
      <div className="flex items-center gap-2">
        <h1 className={`font-black italic text-[#001b44] uppercase tracking-tighter transition-all duration-500 ${
          isCompact ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'
        }`}>
          ALL
        </h1>
        <span className={`font-light text-[#001b44]/20 italic transition-all duration-500 ${
          isCompact ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'
        }`}>
          /{totalProducts}
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* أزرار العرض */}
        <div className="flex items-center bg-gray-50 rounded-full p-0.5 border border-gray-100">
          {[2, 1].map((num) => (
            <button 
              key={num} 
              onClick={() => setViewMode(num)}
              className={`rounded-full transition-all duration-300 ${
                isCompact ? 'p-1.5' : 'p-2 md:p-2.5'
              } ${
                viewMode === num ? 'bg-white text-[#d4af37] shadow-sm' : 'text-gray-400 hover:text-[#001b44]'
              }`}
            >
              {num === 2 ? <LayoutGrid size={isCompact ? 14 : 16} /> : <Maximize2 size={isCompact ? 14 : 16} />}
            </button>
          ))}
        </div>

        {/* زر الفلتر */}
        <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 group">
          <span className={`hidden md:block font-black uppercase tracking-[0.2em] text-[#001b44] group-hover:text-[#d4af37] transition-all duration-500 ${
            isCompact ? 'text-[9px]' : 'text-[11px]'
          }`}>
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </span>
          <ListFilter size={isCompact ? 14 : 16} className="text-[#001b44] group-hover:text-[#d4af37] transition-all" />
        </button>
      </div>
    </div>
  );
};

export default ShopHeader;