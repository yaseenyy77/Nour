import React from 'react';
import { LayoutGrid, Maximize2, ListFilter, ChevronDown, Square } from 'lucide-react';

const ShopHeader = ({ totalProducts, viewMode, setViewMode, isFilterOpen, setIsFilterOpen }) => {
  return (
    <>
      <div className="w-full bg-white px-6 md:px-16 py-6 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 z-30 relative">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-black italic text-[#001b44] uppercase tracking-tighter">ALL</h1>
          <span className="text-2xl md:text-3xl font-light text-[#001b44]/20 italic">/{totalProducts}</span>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          
          {/* محول العرض (View Mode) - يظهر الآن في الموبايل والديسكتاب بجانب الفلتر */}
          <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
            {[2, 1].map((num) => (
              <button 
                key={num} 
                onClick={() => setViewMode(num)}
                className={`p-2 md:p-2.5 rounded-full transition-all duration-300 ${
                  viewMode === num 
                  ? 'bg-white text-[#d4af37] shadow-sm' 
                  : 'text-gray-400 hover:text-[#001b44]'
                }`}
              >
                {num === 2 ? <LayoutGrid size={16} /> : <Maximize2 size={16} />}
              </button>
            ))}
          </div>

          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 group">
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#001b44] group-hover:text-[#d4af37] transition-colors">
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </span>
            <ListFilter size={16} className={`text-[#001b44] transition-transform duration-500 ${isFilterOpen ? 'rotate-180' : ''} group-hover:text-[#d4af37]`} />
          </button>
        </div>
      </div>

      {/* 🗑️ تم حذف قسم الزرار العائم (Fixed Toolbar) من هنا نهائياً */}
    </>
  );
};

export default ShopHeader;