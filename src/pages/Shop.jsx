import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { useInventory } from '../hooks/useSliders'; 

const Shop = () => {
  const { data: products = [], isLoading } = useInventory(); 
  const [viewMode, setViewMode] = useState(2); 
  const [isFilterOpen, setIsFilterOpen] = useState(false); 
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] }); 

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || 
                       selectedFilters.category.some(cat => product.category?.toLowerCase() === cat.toLowerCase());
      const karatMatch = selectedFilters.karat.length === 0 || selectedFilters.karat.includes(product.karat);
      const brandMatch = selectedFilters.brand.length === 0 || 
                         selectedFilters.brand.some(br => product.brand?.toLowerCase() === br.toLowerCase());
      return catMatch && karatMatch && brandMatch;
    });
  }, [selectedFilters, products]); 

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#d4af37] font-black uppercase tracking-[0.3em]">Loading...</div>;

  return (
    // الـ pt-20 تضمن مساحة كافية للهيدر الأساسي في البداية
    <div className="min-h-screen bg-white pb-20 pt-16 md:pt-20">
      <ShopHeader 
        totalProducts={filteredProducts.length} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isFilterOpen={isFilterOpen} 
        setIsFilterOpen={setIsFilterOpen} 
      />

      <div className={`flex flex-col lg:flex-row px-2 md:px-12 mt-2 md:mt-4 items-start relative transition-all duration-500 ${isFilterOpen ? 'gap-4 lg:gap-8' : 'gap-0'}`}>
        <FilterSidebar 
          isOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
          selectedFilters={selectedFilters} 
          setSelectedFilters={setSelectedFilters} 
        />
        
        <div className="flex-1 w-full">
          {/* تأكدنا من وجود z-0 هنا عشان ميتغطاش على الهيدر */}
          <div className={`grid relative z-0 transition-all duration-500 ${
            viewMode === 1 ? 'grid-cols-1 gap-4' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6'
          }`}>
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