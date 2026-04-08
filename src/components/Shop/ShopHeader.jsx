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

        <div className="flex items-center gap-8">
          {/* محول الجريد للديسكتاب */}
          <div className="hidden md:flex items-center border border-gray-200 divide-x divide-gray-200">
            {[4, 2, 1].map((num) => (
              <button 
                key={num} 
                onClick={() => setViewMode(num)}
                className={`p-3 ${viewMode === num ? 'bg-[#001b44] text-white' : 'text-gray-400'}`}
              >
                {num === 4 ? <LayoutGrid size={18} /> : num === 2 ? <Square size={18} /> : <Maximize2 size={18} />}
              </button>
            ))}
          </div>

          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#001b44]">
              {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
            </span>
            <ListFilter size={16} className={`text-[#001b44] transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* الزرار العايم للموبايل (Fixed Toolbar) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] md:hidden">
        <div className="bg-[#1a1a1a]/90 backdrop-blur-md text-white flex items-center gap-2 p-1.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          <button 
            onClick={() => setViewMode(1)}
            className={`p-3.5 rounded-full transition-all ${viewMode === 1 ? 'bg-[#d4af37] text-[#001b44]' : 'text-gray-400'}`}
          >
            <Maximize2 size={22} />
          </button>
          <div className="w-[1px] h-6 bg-white/10" />
          <button 
            onClick={() => setViewMode(2)}
            className={`p-3.5 rounded-full transition-all ${viewMode === 2 ? 'bg-[#d4af37] text-[#001b44]' : 'text-gray-400'}`}
          >
            <LayoutGrid size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ShopHeader;