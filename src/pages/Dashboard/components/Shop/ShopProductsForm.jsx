import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../supabaseClient';
import { 
  Loader2, 
  Plus, 
  Trash2, 
  LayoutGrid, 
  RefreshCcw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

const SliderManagement = () => {
  const [shopProducts, setShopProducts] = useState([]);
  const [sliderProducts, setSliderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');

  // 1. جلب البيانات من الجداول
  const fetchData = async () => {
    setLoading(true);
    const { data: shopData } = await supabase.from('inventory').select('*');
    const { data: sliderData } = await supabase.from('sliders').select('*');
    setShopProducts(shopData || []);
    setSliderProducts(sliderData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. الدالة السحرية: إضافة للسلايدر بنفس الـ ID
  const handleAddToSlider = async (e) => {
    e.preventDefault();
    if (!selectedProductId) return alert("الرجاء اختيار منتج من القائمة أولاً");

    const productToAdd = shopProducts.find(p => p.id.toString() === selectedProductId);
    if (!productToAdd) return;

    setActionLoading(true);

    // ملاحظة: يجب أن تكون قد مسحت (Default Value) لعمود الـ id في Supabase
    const { error } = await supabase
      .from('sliders')
      .insert([
        { 
          id: productToAdd.id, // نرسل نفس الـ ID الخاص بالشوب
          name: productToAdd.name,
          image: productToAdd.image,
          weight: productToAdd.weight,
          karat: productToAdd.karat,
          category: productToAdd.category,
          brand: productToAdd.brand || "Royal Jewelry"
        }
      ]);

    if (error) {
      if (error.code === '23505') {
        alert("هذا المنتج مضاف بالفعل في السلايدر بنفس الـ ID");
      } else {
        alert("خطأ: " + error.message);
      }
    } else {
      alert("تمت المزامنة والإضافة بنفس الـ ID بنجاح! ✨");
      fetchData(); // تحديث القائمة
    }
    setActionLoading(false);
  };

  // 3. حذف من السلايدر
  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المنتج من السلايدر؟")) return;
    const { error } = await supabase.from('sliders').delete().eq('id', id);
    if (!error) fetchData();
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-[#d4af37]" size={40} />
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#fcfcfc] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* تصميم الهيدر */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-[#001b44] uppercase italic tracking-tighter">Slider Control</h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Sync Shop Products to Home Sliders</p>
          </div>
          <button onClick={fetchData} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all text-[#001b44]">
            <RefreshCcw size={20} />
          </button>
        </div>

        {/* قسم الإضافة بنفس الـ ID */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gray-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-[#d4af37]">
            <Plus size={120} />
          </div>
          
          <form onSubmit={handleAddToSlider} className="relative z-10 space-y-8">
            <div className="space-y-4 text-left">
              <label className="text-[10px] font-black uppercase text-[#001b44] tracking-[0.3em] ml-2">Select Product from Shop Inventory</label>
              <select 
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full p-6 rounded-[1.5rem] border-2 border-gray-50 bg-gray-50 font-black text-[#001b44] outline-none focus:border-[#d4af37] focus:bg-white transition-all appearance-none"
              >
                <option value="">-- Choose a piece to sync --</option>
                {shopProducts.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.weight}G) - ID: {p.id}</option>
                ))}
              </select>
            </div>

            <button 
              disabled={actionLoading || !selectedProductId}
              className="w-full bg-[#001b44] text-white p-7 rounded-[2rem] font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-30"
            >
              {actionLoading ? <Loader2 className="animate-spin" size={24} /> : (
                <>
                  <CheckCircle2 size={24} />
                  Sync to Home Slider
                </>
              )}
            </button>
          </form>
        </div>

        {/* عرض المنتجات الحالية في السلايدر */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 ml-4">
            <LayoutGrid className="text-[#d4af37]" size={20} />
            <h2 className="text-xl font-black text-[#001b44] uppercase italic">Live Slider Items ({sliderProducts.length})</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sliderProducts.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 bg-[#f9f9f9] rounded-2xl overflow-hidden p-2">
                    <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" alt="" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] text-[#d4af37] font-black uppercase tracking-widest">{item.category}</p>
                    <h3 className="font-black text-[#001b44] text-sm uppercase leading-tight mt-1">{item.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold mt-2 italic">ID: {item.id}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-3 bg-red-50 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            
            {sliderProducts.length === 0 && (
              <div className="col-span-full py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                <AlertTriangle size={40} className="mb-4" />
                <p className="font-black uppercase tracking-widest text-xs">No Items in Slider</p>
              </div>
            )}
          </div>
        </div>

      </div>
      
      {/* تنسيقات إضافية */}
      <style jsx>{`
        select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23001b44'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1.5rem center;
          background-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default SliderManagement;