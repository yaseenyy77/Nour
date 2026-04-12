import React from 'react';
import { useInventory, useAddSlider } from '../../../../hooks/useSliders';
import { Plus, Loader2, Package, Scale, Tag, Bookmark, Info } from 'lucide-react';

const SliderForm = ({ onSliderAdded }) => {
  const { data: products = [], isLoading } = useInventory();
  const addSliderMutation = useAddSlider();

  // خريطة تحويل الفئات إذا كنت تحتاجها، لو عايزها تنزل زي ما هي ممكن نلغي الماب
  const categoryMap = { 
    'Ring': 'rings', 
    'Necklace': 'necklaces', 
    'Bracelet': 'bracelets', 
    'Earring': 'earrings' 
  };

  const handleAddToSlider = (product) => {
    // تجهيز البيانات مع التأكد من إرسال الـ ID الأصلي
    const mappedCategory = categoryMap[product.category] || product.category.toLowerCase();
    
    const sliderData = { 
      id: product.id, // السطر ده هو الأهم: نقل الـ ID بتاع الشوب للسلايدر
      name: product.name, // تأكد إن العمود ده موجود في جدول sliders
      image: product.image, 
      weight: product.weight.toString(), 
      karat: product.karat, 
      category: mappedCategory 
    };

    // تنفيذ عملية الإضافة (الميوتيشن)
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
      <p className="mt-4 text-[#001b44] font-bold animate-pulse">Loading Inventory...</p>
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
            بمجرد الضغط على زر الإضافة، سيتم نسخ المنتج بنفس بياناته ومعرفه (ID) لضمان ربط الويش ليست وصفحة التفاصيل بشكل تلقائي.
          </p>
        </div>
      </div>

      {/* هيدر القسم */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Package className="text-[#001b44]" size={20} />
          <h2 className="text-[#001b44] font-black uppercase text-sm tracking-tighter italic">Select From Inventory</h2>
        </div>
        <span className="bg-gray-100 text-[#001b44] px-4 py-1.5 rounded-full text-[9px] font-black uppercase">
          {products.length} Pieces Available
        </span>
      </div>

      {/* شبكة عرض المنتجات */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div 
            key={p.id} 
            className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#d4af37]/20 transition-all duration-500 overflow-hidden flex flex-col"
          >
            {/* منطقة الصورة */}
            <div className="relative aspect-square bg-[#fcfcfc] p-4 flex items-center justify-center overflow-hidden">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="bg-[#001b44] text-[#d4af37] px-2 py-1 rounded-lg text-[8px] font-black shadow-lg">#{p.id.toString().slice(-4)}</span>
                <span className="bg-white text-black px-2 py-1 rounded-lg text-[8px] font-black shadow-sm border border-gray-50">{p.karat}</span>
              </div>
            </div>
            
            {/* بيانات المنتج */}
            <div className="p-4 flex flex-col flex-1 bg-white">
              <h3 className="text-[#001b44] font-black uppercase text-[10px] mb-3 truncate border-b border-gray-50 pb-2 italic tracking-tight">
                {p.name}
              </h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-500 italic">
                  <Scale size={12} className="text-[#d4af37]" />
                  <span className="text-[9px] font-bold">{p.weight} Grams</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 uppercase">
                  <Tag size={12} className="text-blue-400" />
                  <span className="text-[9px] font-bold tracking-widest">{p.category}</span>
                </div>
              </div>

              {/* زر الإضافة */}
              <button 
                onClick={() => handleAddToSlider(p)}
                disabled={addSliderMutation.isPending}
                className="mt-auto w-full bg-[#001b44] text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-100"
              >
                {addSliderMutation.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <>
                    <Plus size={14} strokeWidth={3} />
                    Add to Slider
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* تنسيقات إضافية للجمالية */}
      <style jsx>{`
        .group:hover img {
          transform: scale(1.1) translateY(-5px);
        }
      `}</style>
    </div>
  );
};

export default SliderForm;