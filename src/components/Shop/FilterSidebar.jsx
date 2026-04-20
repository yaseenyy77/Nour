import React from 'react';
import { RotateCcw, X, Circle } from 'lucide-react';

const FilterSidebar = ({ isOpen, setIsFilterOpen, selectedFilters, setSelectedFilters }) => {
  const filterCategories = [
    { id: 'category', title: 'Collection', options: ['Ring', 'Necklace', 'Bracelet', 'Earring',] },
    { id: 'karat', title: 'Gold Purity', options: ['18K', '21K', '24K'] },
    { id: 'brand', title: 'House of Design', options: ["L'azurde", "Egypt Gold", "Jawhara", "Iram","Selema Gold","Kirmena","Damas","Siran","Glamour","King Gold"] },
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
      {/* 1. Overlay (الخلفية المظلمة) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      ></div>

      {/* 2. Aside (السايد بار) */}
      <aside className={`
      
        /* إعدادات الموبايل: جعلناها عائمة بمسافات من الجوانب */
        fixed left-4 right-4 top-24 bottom-6 z-[70]
        bg-white rounded-[2.5rem] shadow-2xl overflow-hidden
        
        /* إعدادات الديسكتوب: تعود لشكلها الأصلي المستقر */
        lg:sticky lg:top-32 lg:left-0 lg:h-[75vh] lg:m-0 lg:z-0
        lg:bg-transparent lg:shadow-none lg:rounded-none
        
        /* الانتقالات (Animations) - Updated to handle slide and width smoothly! */
        transition-all duration-500 ease-in-out
        ${isOpen 
          ? 'translate-y-0 opacity-100 pointer-events-auto lg:w-[260px] lg:translate-x-0' 
          : 'translate-y-10 opacity-0 pointer-events-none lg:translate-y-0 lg:w-0 lg:-translate-x-8'
        }
      `}>
        
        {/* الحاوية الداخلية للسكرول - Added fixed width (lg:w-[260px]) so content clips beautifully instead of squishing */}
        <div className="flex flex-col h-full p-8 lg:p-0 w-full lg:w-[260px]">
          
          {/* الهيدر الخاص بالسايد بار */}
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
                  <RotateCcw size={16} />
                </button>
              )}
              {/* زر الإغلاق يظهر في الموبايل فقط */}
              <button onClick={() => setIsFilterOpen(false)} className="lg:hidden text-gray-400 hover:text-black p-1">
                <X size={24} />
              </button>
            </div>
          </div>

          {/* محتوى الفلاتر القابل للسكرول */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-10">
            {filterCategories.map((cat) => (
              <div key={cat.id}>
                <h3 className="text-[#001b44] font-black text-[10px] uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#d4af37]"></span>
                  {cat.title}
                </h3>
                
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
                            ? 'bg-[#001b44] border-[#001b44] text-[#d4af37] shadow-md' 
                            : 'bg-white border-gray-50 text-gray-400 hover:border-[#d4af37]/30 hover:text-[#001b44]'}
                        `}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider italic">{option}</span>
                        
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

          {/* زر التطبيق للموبايل فقط في الأسفل */}
          <div className="mt-6 lg:hidden">
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="w-full bg-[#001b44] text-white py-4 rounded-2xl font-bold uppercase text-[11px] tracking-[0.2em] shadow-xl active:scale-[0.98] transition-transform"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* تنسيق السكرول بار */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }
      `}} />
    </>
  );
};

export default FilterSidebar;