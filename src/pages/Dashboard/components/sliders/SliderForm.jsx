import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Bookmark, Info } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  const categoryMap = { 'Ring': 'rings', 'Necklace': 'necklaces', 'Bracelet': 'bracelets', 'Earring': 'earrings' };

  const handleAddToSlider = (product) => {
    const mappedCategory = categoryMap[product.category] || product.category.toLowerCase();
    const sliderData = { image: product.image, weight: product.weight.toString(), karat: product.karat, category: mappedCategory };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        alert("تمت الإضافة بنجاح! ✨");
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => alert(`خطأ: ${error.message}`)
    });
  };

  if (isLoading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#d4af37]" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3 border border-blue-100">
        <Info size={18} className="text-blue-600" />
        <p className="text-[#001b44] font-bold text-[10px] uppercase tracking-wider">اختر من المخزن لإضافة المنتج مباشرة للعرض</p>
      </div>

      {/* Grid نظام: 2 موبايل، 4 تابلت ودسكتوب - الحجم الوسط المريح */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[1.8rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col group">
            <div className="aspect-square bg-[#fcfcfc] relative p-4">
              <img src={p.image} className="w-full h-full object-contain" alt={p.name} />
              <span className="absolute top-3 left-3 bg-[#001b44] text-[#d4af37] px-2 py-0.5 rounded-lg text-[8px] font-black">{p.karat}</span>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-[#001b44] font-black uppercase text-[10px] mb-3 truncate border-b border-gray-50 pb-2">{p.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-500 italic">
                  <Scale size={12} className="text-[#d4af37]" />
                  <span className="text-[9px] font-bold">{p.weight}g</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 uppercase">
                  <Tag size={12} className="text-blue-400" />
                  <span className="text-[9px] font-bold">{p.category}</span>
                </div>
              </div>

              <button 
                onClick={() => handleAddToSlider(p)}
                disabled={addSliderMutation.isPending}
                className="mt-auto w-full bg-[#001b44] text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2"
              >
                {addSliderMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
                Add To Slider
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderForm;