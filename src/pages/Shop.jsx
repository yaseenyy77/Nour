import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { useInventory } from '../hooks/useSliders'; 

const Shop = () => {
  const { data: products = [], isLoading } = useInventory(); //
  const [viewMode, setViewMode] = useState(4); //
  const [isFilterOpen, setIsFilterOpen] = useState(false); //
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] }); //

  // منطق الفلترة الاحترافي 
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
  }, [selectedFilters, products]); //

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

      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-12 mt-8 items-start relative">
        
        {/* السايد بار المطور - تم إصلاح تمرير الـ Props */}
        <FilterSidebar 
          isOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
        
        {/* عرض المنتجات المتجاوب */}
        <div className="flex-1 w-full">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-6 transition-all duration-500 ${
              viewMode === 1 ? 'grid-cols-1' : 
              viewMode === 2 ? 'grid-cols-2' : 
              viewMode === 3 ? 'grid-cols-2 lg:grid-cols-3' : 
              'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
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