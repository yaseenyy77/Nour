import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Bookmark, Info } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  // قاموس التحويل لضمان عدم حدوث خطأ الـ Constraint في قاعدة البيانات
  const categoryMap = {
    'Ring': 'rings',
    'Necklace': 'necklaces',
    'Bracelet': 'bracelets',
    'Earring': 'earrings'
  };

  const handleAddToSlider = (product) => {
    const mappedCategory = categoryMap[product.category] || product.category.toLowerCase();

    const sliderData = {
      image: product.image,
      weight: product.weight.toString(),
      karat: product.karat,
      category: mappedCategory
    };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        alert("تمت الإضافة للسلايدر بنجاح! ✨");
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        alert(`فشل الإضافة: ${error.message}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
        <p className="text-[#001b44] font-black uppercase text-[10px] tracking-widest italic">جاري سحب المخزن المكي...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#001b44]/5 p-4 rounded-2xl border border-[#001b44]/10 flex items-center gap-3">
        <Info className="text-[#001b44] shrink-0" size={18} />
        <p className="text-[#001b44] font-bold text-[9px] md:text-[10px] uppercase tracking-wider leading-relaxed text-right flex-1">
           اختر من المخزن أدناه. الكروت مصممة لتكون مدمجة في الشاشات الكبيرة لعرض أكبر عدد ممكن.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <Package className="mx-auto mb-4 text-gray-200" size={48} />
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">المخزن فارغ</p>
        </div>
      ) : (
        /* Grid System:
           - Mobile: 2 columns
           - Tablet: 3 columns
           - Desktop: 5 columns
           - Large Screens: 6 columns (بيخلي الكروت أصغر وشكلها أشيك)
        */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[1.2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">
              
              {/* Image & Karat Badge */}
              <div className="aspect-square bg-[#fcfcfc] relative p-2">
                <img src={p.image} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" alt={p.name} />
                <div className="absolute top-1.5 left-1.5">
                  <span className="bg-[#001b44] text-[#d4af37] px-1.5 py-0.5 rounded-md text-[7px] font-black italic">
                    {p.karat}
                  </span>
                </div>
              </div>
              
              {/* Product Details Area */}
              <div className="p-2.5 flex flex-col flex-1 bg-white">
                <h3 className="text-[#001b44] font-black uppercase text-[8px] md:text-[9px] mb-2 truncate leading-tight border-b border-gray-50 pb-1">
                    {p.name}
                </h3>
                
                <div className="space-y-1.5 mb-3">
                    {/* Weight */}
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <Scale size={10} className="text-[#d4af37]" />
                        <span className="text-[7px] md:text-[8px] font-bold tracking-tighter">{p.weight} Grams</span>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-1.5 text-gray-500">
                        <Tag size={10} className="text-blue-400" />
                        <span className="text-[7px] md:text-[8px] font-bold uppercase">{p.category}</span>
                    </div>

                    {/* Brand */}
                    {p.brand && (
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Bookmark size={10} className="text-red-400" />
                            <span className="text-[7px] md:text-[8px] font-black uppercase truncate">{p.brand}</span>
                        </div>
                    )}
                </div>

                {/* Add Button */}
                <button 
                  onClick={() => handleAddToSlider(p)}
                  disabled={addSliderMutation.isPending}
                  className="mt-auto w-full bg-[#001b44] text-white py-2 rounded-lg text-[7px] font-black uppercase tracking-[0.1em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
                >
                  {addSliderMutation.isPending ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <Plus size={10} />
                  )}
                  Add to Slider
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderForm;