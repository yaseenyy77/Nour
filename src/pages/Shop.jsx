import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { useInventory } from '../hooks/useSliders'; 

const Shop = () => {
  const { data: products = [], isLoading } = useInventory(); 
  // تعديل: القيمة الافتراضية 4 عشان يظهر كروت صغيرة من الأول
  const [viewMode, setViewMode] = useState(4); 
  // Adjusted to false if you want it closed by default initially (matches the video)
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] }); 

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || 
                       selectedFilters.category.some(cat => 
                         product.category?.toLowerCase() === cat.toLowerCase()
                       );
      const karatMatch = selectedFilters.karat.length === 0 || 
                         selectedFilters.karat.includes(product.karat);
      const brandMatch = selectedFilters.brand.length === 0 || 
                         selectedFilters.brand.some(br => 
                           product.brand?.toLowerCase() === br.toLowerCase()
                         );
      return catMatch && karatMatch && brandMatch;
    });
  }, [selectedFilters, products]); 

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#d4af37] font-black uppercase tracking-[0.3em]">Loading Royal Vault...</div>;

  return (
    <div className="min-h-screen bg-white pt-20 pb-20 overflow-x-hidden">
      <ShopHeader 
        totalProducts={filteredProducts.length} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isFilterOpen={isFilterOpen} 
        setIsFilterOpen={setIsFilterOpen} 
      />

      {/* تعديل: Added dynamic gap so when the filter slides away, the layout smoothly claims the empty space */}
      <div className={`flex flex-col lg:flex-row px-2 md:px-12 mt-4 md:mt-8 items-start relative transition-all duration-500 ease-in-out ${isFilterOpen ? 'gap-4 lg:gap-8' : 'gap-0'}`}>
        
        <FilterSidebar 
          isOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
        
        <div className="flex-1 w-full">
          {filteredProducts.length > 0 ? (
            /* تعديل الـ Grid:
               1. gap-1.5 على الموبايل عشان الكروت تلزق في بعض زي الصورة.
               2. grid-cols-2 ثابتة في أغلب الأوضاع للموبايل.
            */
            <div className={`grid transition-all duration-500 ${
              viewMode === 1 ? 'grid-cols-1 gap-4' : 
              'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1.5 md:gap-6'
            }`}>
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} {...product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="py-20 md:py-40 text-center border-2 border-dashed border-gray-50 rounded-[3rem]">
               <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-xs">No pieces found in the vault</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;