import React, { useState, useMemo, useEffect } from 'react';
import ShopHeader from '../components/Shop/ShopHeader'; 
import FilterSidebar from '../components/Shop/FilterSidebar'; 
import ShopProductCard from '../components/Shop/ShopProductCard'; 
import { supabase } from '../supabaseClient'; // استيراد سوبابيز
import { X } from 'lucide-react';

const Shop = () => {
  const [viewMode, setViewMode] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ category: [], karat: [], brand: [] });
  const [products, setProducts] = useState([]); // حالة لتخزين المنتجات من قاعدة البيانات
  const [loading, setLoading] = useState(true);

  // جلب البيانات من Supabase عند تحميل الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false }); // الأحدث يظهر أولاً

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // تعديل أسماء الحقول لتطابق التي أضفناها في جدول SQL
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

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="text-[#d4af37] font-serif italic text-2xl animate-pulse">جاري جلب مجوهراتك...</div>
    </div>
  );

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
            <div className="absolute right-0 top-0 h-full w-[85%] bg-white p-6 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-black text-xl uppercase italic">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
              </div>
              <FilterSidebar isOpen={true} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
          </div>
        )}

        {/* الفيلتر للديسكتاب */}
        {isFilterOpen && (
          <div className="sticky top-32 w-[280px] shrink-0 hidden md:block">
            <FilterSidebar isOpen={true} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
          </div>
        )}

        <div className="flex-1 w-full transition-all duration-300">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400 italic">لا توجد منتجات تطابق اختياراتك حالياً</div>
          ) : (
            <div className={`grid gap-4 md:gap-6 ${getGridCols()}`}>
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} {...product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;