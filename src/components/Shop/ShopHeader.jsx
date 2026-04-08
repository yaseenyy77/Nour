import React from 'react';
import { LayoutGrid, Grid, Columns, ListFilter, ChevronDown } from 'lucide-react';

const ShopHeader = ({ totalProducts, viewMode, setViewMode, isFilterOpen, setIsFilterOpen }) => {
  return (
    <div className="w-full bg-white px-6 md:px-16 py-6 border-b border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 z-30">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-black italic text-[#001b44] uppercase tracking-tighter">ALL</h1>
        <span className="text-2xl md:text-3xl font-light text-[#001b44]/20 italic">/{totalProducts}</span>
      </div>

      <div className="flex items-center gap-8">
        {/* Grid Controls */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-full p-1 border border-gray-100">
          {[2, 4, 5].map((num) => (
            <button 
              key={num}
              onClick={() => setViewMode(num)}
              className={`p-2 rounded-full transition-all ${viewMode === num ? 'bg-[#001b44] text-white shadow-md' : 'text-gray-400 hover:text-[#001b44]'}`}
            >
              {num === 2 ? <Columns size={18} /> : num === 4 ? <LayoutGrid size={18} /> : <Grid size={18} />}
            </button>
          ))}
        </div>

        {/* Filter Toggle Button */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 group"
        >
          <span className="text-[11px] font-black uppercase tracking-widest text-[#001b44]">
            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
          </span>
          <ListFilter size={16} className={`text-[#001b44] transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#001b44]">
            Sort: <span className="text-gray-400 font-bold">Featured</span>
          </span>
          <ChevronDown size={16} className="text-[#001b44] transition-transform group-hover:rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;