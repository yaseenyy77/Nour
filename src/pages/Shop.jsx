import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { productsData } from '../data/productsData';

const Shop = () => {
  const [viewMode, setViewMode] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // خليه مقفول في البداية للموبايل
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    karat: [],
    brand: []
  });

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category);
      const karatMatch = selectedFilters.karat.length === 0 || selectedFilters.karat.includes(product.material);
      const brandMatch = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.manufacturer);
      return catMatch && karatMatch && brandMatch;
    });
  }, [selectedFilters]);

  const getGridCols = () => {
    // في الموبايل دايماً 2، وفي الشاشات الكبيرة بنعتمد على الـ viewMode
    switch (viewMode) {
      case 2: return 'grid-cols-2';
      case 4: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      default: return 'grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-28">
      <ShopHeader 
        totalProducts={filteredProducts.length} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <div className="flex px-4 md:px-16 mt-4 md:mt-8 items-start relative">
        
        {/* السايد بار للموبايل (Drawer) والكمبيوتر */}
        <div className={`
          fixed inset-0 z-50 transition-transform duration-500 md:relative md:inset-auto md:z-0 md:translate-x-0
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full md:hidden'}
        `}>
          {/* Overlay للموبايل فقط */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          
          <div className="relative h-full w-[80%] max-w-[300px] md:w-auto md:max-w-none">
             <FilterSidebar 
              isOpen={true} // خليه دايماً true لأن التحكم بقى في الـ Wrapper
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
        </div>

        {/* شبكة المنتجات */}
        <div className="flex-1 w-full">
          <div className={`grid gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 ${getGridCols()}`}>
            {filteredProducts.map((product) => (
              <ShopProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-[10px] text-gray-400 font-black uppercase tracking-widest">
              No Treasures Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;