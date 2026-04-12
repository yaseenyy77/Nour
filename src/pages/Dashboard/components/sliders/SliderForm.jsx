import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Bookmark, Info } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  const categoryMap = { 'Ring': 'rings', 'Necklace': 'necklaces', 'Bracelet': 'bracelets', 'Earring': 'earrings' };

  const handleAddToSlider = (product) => {
    const mappedCategory = categoryMap[product.category] || product.category.toLowerCase();
    
    // التعديل هنا: نرسل الـ id يدوياً ليتطابق مع جدول المخزن
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
        alert("تمت المزامنة والإضافة للسلايدر بنفس الـ ID بنجاح! ✨");
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        if (error.message.includes('unique constraint') || error.code === '23505') {
          alert("هذا المنتج موجود بالفعل في السلايدر بنفس الـ ID");
        } else {
          alert(`خطأ: ${error.message}`);
        }
      }
    });
  };

  if (isLoading) return (
    <div className="py-20 text-center">
      <Loader2 className="animate-spin mx-auto text-[#d4af37]" size={40} />
      <p className="mt-4 text-[#001b44] font-bold animate-pulse uppercase text-[10px] tracking-widest">Loading Royal Inventory...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* قسم التنبيهات الإرشادية */}
      <div className="bg-blue-50 p-6 rounded-[2rem] flex items-start gap-4 border border-blue-100 shadow-sm">
        <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
          <Info size={20} />
        </div>
        <div className="text-left">
          <h4 className="text-blue-900 font-black text-xs uppercase tracking-widest mb-1">Smart Sync Protocol</h4>
          <p className="text-blue-700/70 text-[10px] leading-relaxed font-bold">
            يتم الآن نسخ المنتج بنفس الـ ID الأصلي لضمان عمل "المفضلة" وصفحة "التفاصيل" بشكل موحد في جميع أنحاء المنصة.
          </p>
        </div>
      </div>

      {/* هيدر القائمة */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Package className="text-[#001b44]" size={20} />
          <h2 className="text-[#001b44] font-black uppercase text-sm tracking-tighter italic">Select From Inventory</h2>
        </div>
        <span className="bg-gray-100 text-[#001b44] px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
          {products.length} Pieces Available
        </span>
      </div>

      {/* عرض المنتجات المتاحة */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-xl hover:border-[#d4af37]/30 transition-all duration-500">
            <div className="aspect-square bg-[#fcfcfc] relative p-6 flex items-center justify-center overflow-hidden">
              <img src={p.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={p.name} />
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                 <span className="bg-[#001b44] text-[#d4af37] px-3 py-1 rounded-xl text-[8px] font-black shadow-lg">#{p.id.toString().slice(-4)}</span>
                 <span className="bg-white/80 backdrop-blur-sm text-black px-3 py-1 rounded-xl text-[8px] font-black border border-gray-100 shadow-sm">{p.karat}</span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-[#001b44] font-black uppercase text-[10px] mb-4 truncate border-b border-gray-50 pb-2 italic tracking-tight">
                {p.name}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-gray-500">
                  <Scale size={13} className="text-[#d4af37]" />
                  <span className="text-[10px] font-bold italic">{p.weight} Grams</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-500">
                  <Tag size={13} className="text-blue-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{p.category}</span>
                </div>
              </div>

              <button 
                onClick={() => handleAddToSlider(p)}
                disabled={addSliderMutation.isPending}
                className="mt-auto w-full bg-[#001b44] text-white py-4 rounded-[1.2rem] text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-100 disabled:opacity-50"
              >
                {addSliderMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    <Plus size={16} strokeWidth={3} />
                    Add To Slider
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* مظهر جمالي */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SliderForm;