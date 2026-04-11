import React from 'react';
import { RotateCcw, X, Circle } from 'lucide-react';

const FilterSidebar = ({ isOpen, setIsFilterOpen, selectedFilters, setSelectedFilters }) => {
  const filterCategories = [
    { id: 'category', title: 'Collection', options: ['Ring', 'Necklace', 'Bracelet', 'Earring',] },
    { id: 'karat', title: 'Gold Purity', options: ['18K', '21K', '24K'] },
    { id: 'brand', title: 'House of Design', options: ["L'azurde", "Egypt Gold", "Jawhara", "Iram"] },
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

  const hasActiveFilters = Object.values(selectedFilters).flat().length > 0;

  return (
    <>
      {/* Overlay للموبايل */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsFilterOpen(false)}
      ></div>

      <aside className={`
        fixed lg:sticky top-0 lg:top-32 left-0 h-full lg:h-[75vh] z-50 lg:z-0
        bg-white lg:bg-transparent 
        w-[260px] p-6 lg:p-0 /* تم تصغير العرض لـ 260px */
        transition-all duration-700 ease-in-out
        ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full lg:translate-x-0 lg:opacity-100'}
      `}>
        {/* الحاوية الأساسية مع سكرول بار مخصص */}
        <div className="flex flex-col h-full overflow-y-auto pr-3 custom-scrollbar">
          
          {/* الهيدر */}
          <div className="flex justify-between items-center mb-8 sticky top-0 bg-white lg:bg-transparent z-10 pb-4">
            <div>
              <h2 className="text-[#001b44] font-black uppercase italic tracking-tighter text-xl leading-none">Filters</h2>
              <div className="h-0.5 w-6 bg-[#d4af37] mt-1"></div>
            </div>
            
            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button 
                  onClick={() => setSelectedFilters({ category: [], karat: [], brand: [] })} 
                  className="text-[#d4af37] hover:text-[#001b44] transition-colors"
                  title="Reset All"
                >
                  <RotateCcw size={14} />
                </button>
              )}
              <button onClick={() => setIsFilterOpen(false)} className="lg:hidden text-gray-400">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* قائمة الفلاتر */}
          <div className="space-y-10">
            {filterCategories.map((cat) => (
              <div key={cat.id}>
                {/* النقطة الذهبية الملكية */}
                <h3 className="text-[#001b44] font-black text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>
                  {cat.title}
                </h3>
                
                {/* خيارات الكبسولات */}
                <div className="flex flex-col gap-2.5">
                  {cat.options.map((option) => {
                    const isSelected = selectedFilters[cat.id]?.includes(option);
                    return (
                      <button 
                        key={option} 
                        onClick={() => handleFilterClick(cat.id, option)}
                        className={`
                          flex items-center justify-between px-5 py-3.5 rounded-2xl border-2 transition-all duration-500
                          ${isSelected 
                            ? 'bg-[#001b44] border-[#001b44] text-[#d4af37] shadow-md shadow-blue-900/5' 
                            : 'bg-white border-gray-50 text-gray-400 hover:border-[#d4af37]/30 hover:text-[#001b44]'}
                        `}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider italic">{option}</span>
                        
                        {/* الدائرة اللي بتتملي */}
                        <div className={`
                          w-4 h-4 rounded-full flex items-center justify-center transition-all border
                          ${isSelected ? 'bg-[#d4af37] border-[#d4af37]' : 'bg-gray-50 border-gray-100'}
                        `}>
                          {isSelected && <Circle size={6} className="text-[#001b44] fill-[#001b44]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* زر الموبايل */}
          <div className="mt-8 mb-4 lg:hidden">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#001b44] text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* تنسيق السكرول بار الخاص (اضفه في ملف CSS الرئيسي أو كـ Style tag) */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #001b44;
        }
      `}} />
    </>
  );
};

export default FilterSidebar;