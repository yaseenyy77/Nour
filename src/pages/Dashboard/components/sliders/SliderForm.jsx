import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Tag, Scale } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  // سحب المنتجات من المخزن الفعلي
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  const handleAddToSlider = (product) => {
    // تجهيز البيانات لجدول السلايدر بناءً على المنتج المختار
    const sliderData = {
      image: product.image,
      weight: product.weight,
      karat: product.karat,
      category: product.category || 'Jewelry'
    };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        alert("حدث خطأ أثناء الإضافة: " + error.message);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
        <p className="text-[#001b44] font-black uppercase text-xs tracking-widest">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#001b44]/5 p-4 rounded-2xl border border-[#001b44]/10">
        <p className="text-[#001b44] font-bold text-center text-xs uppercase tracking-widest">
           اختر منتجاً من المخزن لإضافته لـ Home Slider
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <Package className="mx-auto mb-4 text-gray-200" size={48} />
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">لا توجد منتجات في المخزن حالياً</p>
        </div>
      ) : (
        /* عرض المنتجات في شبكة (2 في الموبايل كما طلبت سابقاً) */
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="aspect-square bg-[#fcfcfc] relative p-3">
                <img src={p.image} className="w-full h-full object-contain" alt={p.name} />
                <div className="absolute bottom-2 left-2">
                  <span className="bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[7px] font-black text-[#001b44] border border-gray-100">
                    {p.karat}
                  </span>
                </div>
              </div>
              
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-[#001b44] font-black uppercase text-[9px] mb-2 truncate">{p.name}</h3>
                
                <button 
                  onClick={() => handleAddToSlider(p)}
                  disabled={addSliderMutation.isPending}
                  className="mt-auto w-full bg-[#001b44] text-white py-2 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all flex items-center justify-center gap-1"
                >
                  {addSliderMutation.isPending ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <><Plus size={12} /> Add to Slider</>
                  )}
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