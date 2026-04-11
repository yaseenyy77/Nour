import React from 'react';
import { Check, RotateCcw } from 'lucide-react';

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
    <aside className={`bg-white transition-all duration-500 overflow-hidden ${isOpen ? 'w-[280px] opacity-100' : 'w-0 opacity-0'} sticky top-32`}>
      <div className="w-[280px]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[#001b44] font-black uppercase italic tracking-tighter">Filters</h2>
          {Object.values(selectedFilters).flat().length > 0 && (
            <button 
              onClick={() => setSelectedFilters({ category: [], karat: [], brand: [] })} 
              className="text-[#d4af37] flex items-center gap-1 text-[9px] font-bold uppercase hover:underline transition-all"
            >
              <RotateCcw size={12} /> Reset
            </button>
          )}
        </div>

        {filterCategories.map((cat) => (
          <div key={cat.id} className="mb-10">
            <h3 className="text-[#001b44] font-bold text-[10px] uppercase tracking-widest mb-5 border-b pb-2">{cat.title}</h3>
            <div className="space-y-3">
              {cat.options.map((option) => {
                const isSelected = selectedFilters[cat.id]?.includes(option);
                return (
                  <div key={option} className="flex items-center gap-4 cursor-pointer group" onClick={() => handleFilterClick(cat.id, option)}>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all border ${isSelected ? 'bg-[#001b44] border-[#001b44]' : 'bg-white border-gray-200 group-hover:border-[#d4af37]'}`}>
                      {isSelected && <Check size={12} className="text-[#d4af37]" />}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider transition-colors ${isSelected ? 'text-[#001b44] font-black' : 'text-gray-400 group-hover:text-[#001b44]'}`}>{option}</span>
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