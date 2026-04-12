import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Info, AlertTriangle } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  const categoryMap = { 
    'Ring': 'rings', 
    'Necklace': 'necklaces', 
    'Bracelet': 'bracelets', 
    'Earring': 'earrings' 
  };

  const handleAddToSlider = (product) => {
    const mappedCategory = categoryMap[product.category] || product.category.toLowerCase();
    
    // إرسال البيانات ومعاهم الـ ID بتاع الشوب بالظبط
    const sliderData = { 
      id: product.id, 
      name: product.name,
      image: product.image, 
      weight: product.weight.toString(), 
      karat: product.karat, 
      category: mappedCategory 
    };

    addSliderMutation.mutate(sliderData, {
      onSuccess: () => {
        alert("تم الربط بنجاح بنفس الـ ID! ✨");
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        // لو الـ ID متكرر هيطلع التنبيه ده بدل ما الكود يضرب
        if (error.message.includes('unique constraint') || error.code === '23505') {
          alert("⚠️ المنتج ده مضاف فعلاً في السلايدر بنفس الـ ID");
        } else {
          alert(`خطأ في السوبابيز: ${error.message}`);
        }
      }
    });
  };

  if (isLoading) return (
    <div className="py-20 text-center">
      <Loader2 className="animate-spin mx-auto text-[#d4af37]" size={40} />
      <p className="mt-4 text-[#001b44] font-black uppercase text-[10px] tracking-widest">Loading Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* رسالة توضيحية لضمان عدم التكرار */}
      <div className="bg-[#001b44] p-6 rounded-[2rem] flex items-start gap-4 border border-[#d4af37]/20 shadow-2xl">
        <div className="bg-[#d4af37] p-2 rounded-xl text-[#001b44]">
          <Info size={20} />
        </div>
        <div className="text-left">
          <h4 className="text-[#d4af37] font-black text-xs uppercase tracking-widest mb-1">ID Sync Active</h4>
          <p className="text-white/70 text-[10px] leading-relaxed font-bold">
            النظام هيقوم بنسخ الـ ID الأصلي للمنتج. لو المنتج موجود قبل كدة، السيستم هيرفض التكرار لحماية البيانات.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Package className="text-[#001b44]" size={20} />
          <h2 className="text-[#001b44] font-black uppercase text-sm tracking-tighter italic">Inventory List</h2>
        </div>
        <span className="bg-gray-100 text-[#001b44] px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
          {products.length} Available
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[2.5rem] border border-gray-50 overflow-hidden shadow-sm flex flex-col group hover:shadow-2xl hover:border-[#d4af37]/30 transition-all duration-500">
            <div className="aspect-square bg-[#fcfcfc] relative p-6 flex items-center justify-center overflow-hidden">
              <img src={p.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt="" />
              <div className="absolute top-4 left-4">
                 <span className="bg-white/90 backdrop-blur-sm text-black px-3 py-1 rounded-xl text-[8px] font-black border border-gray-100 shadow-sm uppercase tracking-tighter">
                   ID: {p.id.toString().slice(-5)}...
                 </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1 bg-white">
              <h3 className="text-[#001b44] font-black uppercase text-[10px] mb-4 truncate italic tracking-tight border-b border-gray-50 pb-2">
                {p.name}
              </h3>
              
              <div className="space-y-2 mb-6 text-left">
                <div className="flex items-center gap-2 text-gray-400">
                  <Scale size={12} className="text-[#d4af37]" />
                  <span className="text-[10px] font-bold">{p.weight} G</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Tag size={12} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase">{p.category}</span>
                </div>
              </div>

              <button 
                onClick={() => handleAddToSlider(p)}
                disabled={addSliderMutation.isPending}
                className="mt-auto w-full bg-[#001b44] text-white py-4 rounded-[1.5rem] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {addSliderMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={16} strokeWidth={3} />}
                Add To Slider
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* لمسة جمالية للتصميم */}
      <style jsx>{`
        .group:hover h3 { color: #d4af37; }
      `}</style>
    </div>
  );
};

export default SliderForm;