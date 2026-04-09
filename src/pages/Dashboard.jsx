import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  // حالة موحدة لجميع المدخلات لسهولة الإدارة
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    karat: '',
    brand: '',
    weight: '',
    image: ''
  });
  
  const [loading, setLoading] = useState(false);

  // دالة لتحديث الحالة عند الكتابة في أي حقل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    // إرسال البيانات إلى جدول products
    const { error } = await supabase
      .from('products')
      .insert([formData]);

    if (error) {
      alert("حدث خطأ أثناء الإرسال: " + error.message);
    } else {
      alert("تمت إضافة المنتج بنجاح!");
      // إعادة تعيين النموذج بعد النجاح
      setFormData({
        name: '',
        category: '',
        karat: '',
        brand: '',
        weight: '',
        image: ''
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#111] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
        <h1 className="text-[#d4af37] text-2xl font-serif italic mb-6 text-center">إضافة منتج جديد</h1>
        
        <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* حقل الاسم */}
          <div className="md:col-span-2">
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              placeholder="اسم المنتج"
              className="w-full bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37] transition-all"
              required
            />
          </div>

          {/* حقل الفئة */}
          <input 
            name="category"
            type="text" 
            value={formData.category}
            onChange={handleChange}
            placeholder="الفئة (مثلاً: خواتم)"
            className="bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
            required
          />

          {/* حقل العيار */}
          <input 
            name="karat"
            type="text" 
            value={formData.karat}
            onChange={handleChange}
            placeholder="العيار (21, 18...)"
            className="bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
            required
          />

          {/* حقل البراند */}
          <input 
            name="brand"
            type="text" 
            value={formData.brand}
            onChange={handleChange}
            placeholder="الماركة"
            className="bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
          />

          {/* حقل الوزن */}
          <input 
            name="weight"
            type="text" 
            value={formData.weight}
            onChange={handleChange}
            placeholder="الوزن (جرام)"
            className="bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
          />

          {/* حقل رابط الصورة */}
          <div className="md:col-span-2">
            <input 
              name="image"
              type="text" 
              value={formData.image}
              onChange={handleChange}
              placeholder="رابط صورة المنتج (URL)"
              className="w-full bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
            />
          </div>
          
          <button 
            disabled={loading}
            className="md:col-span-2 mt-4 bg-[#d4af37] text-black font-bold py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-[#d4af37]/10"
          >
            {loading ? 'جاري الإضافة...' : 'إضافة المنتج للموقع'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;