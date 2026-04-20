import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Info } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  const handleAddToSlider = (product) => {
    // نستخدم اسم المصنع (manufacturer) ونخزنه في حقل الـ category في السلايدر
    const sliderData = { 
      id: product.id, 
      name: product.name,
      image: product.image, 
      weight: product.weight.toString(), 
      karat: product.karat, 
      category: product.manufacturer // الربط بالبراند يتم هنا
    };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        alert(`تمت إضافة قطعة من ${product.manufacturer} للمعرض بنجاح! ✨`);
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        if (error.code === '23505') {
          alert("⚠️ المنتج ده مضاف فعلاً في السلايدر");
        } else {
          alert(`خطأ: تأكد من وجود الأعمدة الصحيحة في جدول sliders`);
        }
      }
    });
  };

  if (isLoading) return <div className="py-20 text-center"><Loader2 className="animate-spin mx-auto text-[#d4af37]" /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-[#001b44] p-6 rounded-[2rem] flex items-start gap-4 border border-[#d4af37]/20 shadow-2xl">
        <Info size={20} className="text-[#d4af37]" />
        <div className="text-left">
          <h4 className="text-[#d4af37] font-black text-xs uppercase tracking-widest mb-1">Brand Mapping Active</h4>
          <p className="text-white/70 text-[10px] leading-relaxed font-bold">
            النظام سيقوم بوضع المنتج في قسم البراند الخاص به آلياً بناءً على بيانات المصنع (Manufacturer).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden shadow-sm flex flex-col group hover:shadow-2xl transition-all duration-500">
            <div className="aspect-square bg-[#fcfcfc] relative p-6 flex items-center justify-center">
              <img src={p.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-[#001b44] font-black uppercase text-[10px] mb-2 truncate italic border-b border-gray-50 pb-2">{p.name}</h3>
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Tag size={12} className="text-[#d4af37]" />
                <span className="text-[10px] font-bold uppercase">{p.manufacturer}</span>
              </div>
              <button 
                onClick={() => handleAddToSlider(p)}
                disabled={addSliderMutation.isPending}
                className="mt-auto w-full bg-[#001b44] text-white py-3 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2"
              >
                {addSliderMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Plus size={14} />}
                Add To Gallery
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SliderForm;