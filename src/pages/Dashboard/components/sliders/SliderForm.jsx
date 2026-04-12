import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Tag, Scale, AlertCircle } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  // سحب المنتجات من المخزن الفعلي
  const { data: products = [], isLoading, isError } = useInventory();
  const addSliderMutation = useAddSlider();

  const handleAddToSlider = (product) => {
    // إرسال الحقول اللي موجودة في جدول السلايدر فقط حسب الفيديو
    const sliderData = {
      image: product.image,
      weight: product.weight.toString(), // تحويل النص لضمان التوافق مع نوع العمود
      karat: product.karat,
      category: product.category || 'Uncategorized'
    };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        alert("تمت إضافة المنتج للسلايدر بنجاح! ✨");
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        console.error("Supabase Error:", error);
        alert(`خطأ في الإضافة: ${error.message || 'تأكد من إعدادات RLS في Supabase'}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
        <p className="text-[#001b44] font-black uppercase text-[10px] tracking-widest">Loading Your Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-center gap-3">
        <AlertCircle className="text-[#001b44]" size={20} />
        <p className="text-[#001b44] font-bold text-[10px] uppercase tracking-wider">
           اختر قطعة من المخزن لعرضها في السلايدر الرئيسي
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
          <Package className="mx-auto mb-4 text-gray-200" size={48} />
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">المخزن فارغ حالياً</p>
        </div>
      ) : (
        /* عرض المنتجات: 2 في الصف للموبايل ليكون Responsive */
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[1.5rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
              <div className="aspect-square bg-[#fcfcfc] relative p-3 overflow-hidden">
                <img src={p.image} className="w-full h-full object-contain transition-transform group-hover:scale-110" alt={p.name} />
                <div className="absolute top-2 left-2">
                  <span className="bg-[#001b44] text-[#d4af37] px-2 py-0.5 rounded-lg text-[8px] font-black">
                    {p.karat}
                  </span>
                </div>
              </div>
              
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-[#001b44] font-black uppercase text-[9px] mb-2 truncate">{p.name}</h3>
                
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <Scale size={10} />
                    <span className="text-[8px] font-bold">{p.weight}g</span>
                </div>

                <button 
                  onClick={() => handleAddToSlider(p)}
                  disabled={addSliderMutation.isPending}
                  className="mt-auto w-full bg-[#001b44] text-white py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
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