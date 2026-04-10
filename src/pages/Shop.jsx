import React, { useState, useMemo } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
// 1. استيراد الـ Hook بدلاً من useEffect و supabase مباشرة
import { useInventory } from '../hooks/useSliders'; 
import { X } from 'lucide-react';

const Shop = () => {
  // 2. استخدام الـ Hook لسحب المنتجات (سيتكفل بالتحديث التلقائي عند أي حذف)
  const { data: products = [], isLoading } = useInventory();
  
  const [viewMode, setViewMode] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] });

  // 3. الفلترة باستخدام البيانات القادمة من الـ Hook
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category);
      const karatMatch = selectedFilters.karat.length === 0 || selectedFilters.karat.includes(product.karat);
      const brandMatch = selectedFilters.brand.length === 0 || selectedFilters.brand.includes(product.brand);
      return catMatch && karatMatch && brandMatch;
    });
  }, [selectedFilters, products]);

  const getGridCols = () => {
    switch (viewMode) {
      case 1: return 'grid-cols-1'; 
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-2 lg:grid-cols-4';
    }
  };

  // حالة التحميل باستخدام React Query
  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#d4af37] font-black uppercase tracking-widest">Loading Royal Vault...</div>;

  return (
    <div className="min-h-screen bg-white pt-20 pb-20">
      <ShopHeader 
        totalProducts={filteredProducts.length} 
        viewMode={viewMode} 
        setViewMode={setViewMode} 
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
      />

      <div className="flex gap-12 px-4 md:px-16 mt-8 items-start relative">
        {isFilterOpen && (
          <div className="sticky top-32 w-[280px] shrink-0 hidden md:block">
            <FilterSidebar isOpen={true} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          </div>
        )}

        <div className="flex-1 w-full transition-all duration-300">
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-4 md:gap-6 ${getGridCols()}`}>
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} {...product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center border-2 border-dashed border-gray-50 rounded-[3rem]">
               <p className="text-gray-300 font-black uppercase tracking-[0.4em] text-sm">No items found in this section</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;