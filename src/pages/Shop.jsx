import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { productsData } from '../data/productsData';
import { X } from 'lucide-react'; // لإغلاق الفيلتر في الموبايل

const Shop = () => {
  const [viewMode, setViewMode] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] });

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category);
      const karatMatch = selectedFilters.karat.length === 0 || selectedFilters.karat.includes(product.material);
      const brandMatch = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.manufacturer);
      return catMatch && karatMatch && brandMatch;
    });
  }, [selectedFilters]);

  const getGridCols = () => {
    switch (viewMode) {
      case 1: return 'grid-cols-1'; 
      case 2: return 'grid-cols-2'; // خليناها 2 ثابتة للموبايل والديسكتاب في وضع المربعات
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <ShopHeader 
        totalProducts={filteredProducts.length} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <div className="flex gap-12 px-4 md:px-16 mt-8 items-start relative">
        
        {/* الفيلتر للموبايل (Drawer) */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-black text-xl uppercase italic">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              <FilterSidebar isOpen={true} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
          </div>
        )}

        {/* الفيلتر للديسكتاب (النسخة الثابتة) */}
        {isFilterOpen && (
          <div className="sticky top-32 w-[280px] shrink-0 hidden md:block">
            <FilterSidebar isOpen={true} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          </div>
        )}

        <div className="flex-1 w-full transition-all duration-300">
          <div className={`grid gap-4 md:gap-6 ${getGridCols()}`}>
            {filteredProducts.map((product) => (
              <ShopProductCard key={product.id} {...product} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;