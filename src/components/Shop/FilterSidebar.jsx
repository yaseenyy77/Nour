import React from 'react';
import { ChevronDown, Check, RotateCcw } from 'lucide-react';

const FilterSidebar = ({ isOpen, selectedFilters, setSelectedFilters }) => {
  const filterCategories = [
    { id: 'category', title: 'Product Category', options: ['Ring', 'Necklace', 'Bracelet', 'Earring'] },
    { id: 'karat', title: 'Gold Karat', options: ['18K', '21K', '24K'] },
    { id: 'brand', title: 'Brand', options: ["L'azurde", "Egypt Gold", "Jawhara"] },
  ];

  const handleFilterClick = (category, option) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      const isSelected = current.includes(option);
      return { 
        ...prev, 
        [category]: isSelected ? current.filter(v => v !== option) : [...current, option] 
      };
    });
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-100 transition-all duration-500 ease-in-out z-20 flex-shrink-0
        ${isOpen ? 'w-[320px] opacity-100 mr-8' : 'w-0 opacity-0 pointer-events-none mr-0'}
        sticky top-32 h-[calc(100vh-160px)]`}
    >
      <div className={`w-[320px] h-full overflow-y-auto px-6 py-4 custom-sidebar-scroll ${!isOpen && 'hidden'}`}>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[#001b44] font-black text-[10px] uppercase tracking-[0.4em] italic">Filters</h2>
          {Object.values(selectedFilters).flat().length > 0 && (
            <button onClick={() => setSelectedFilters({ category: [], karat: [], brand: [] })} className="text-[#d4af37] flex items-center gap-1 text-[9px] font-bold uppercase">
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>
        {filterCategories.map((cat) => (
          <div key={cat.id} className="mb-10">
            <h3 className="text-[#001b44] font-bold text-[11px] uppercase tracking-widest mb-5 border-b pb-2">{cat.title}</h3>
            <div className="space-y-3">
              {cat.options.map((option) => {
                const isSelected = selectedFilters[cat.id]?.includes(option);
                return (
                  <div key={option} className="flex items-center gap-4 cursor-pointer group" onClick={() => handleFilterClick(cat.id, option)}>
                    <div className={`w-5 h-5 rounded-sm flex items-center justify-center transition-all ${isSelected ? 'bg-[#001b44]' : 'bg-gray-50 border'}`}>
                      {isSelected && <Check size={12} className="text-[#d4af37]" />}
                    </div>
                    <span className={`text-[12px] uppercase ${isSelected ? 'text-[#001b44] font-black' : 'text-gray-400'}`}>{option}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSidebar;