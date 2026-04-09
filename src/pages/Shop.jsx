import React, { useState, useMemo, useEffect } from 'react'; // أضفنا useEffect
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { supabase } from '../supabaseClient'; // استيراد سوبابيز
import { X } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]); // مصفوفة المنتجات من القاعدة
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] });

  // جلب البيانات من Supabase عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const catMatch = selectedFilters.category.length === 0 || selectedFilters.category.includes(product.category);
      // تأكد أن أسماء الحقول تطابق قاعدة بياناتك (karat أو material)
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#d4af37]">جاري تحميل المجوهرات...</div>;

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
        {/* Filter Sidebar Logic... */}
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