import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';

const ShopProductsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Rings', 
    karat: '',
    brand: '',
    weight: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('products').insert([formData]);

    if (error) {
      alert("خطأ: " + error.message);
    } else {
      alert("تمت إضافة القطعة للمتجر بنجاح ✨");
      setFormData({ name: '', category: 'Rings', karat: '', brand: '', weight: '', image: '' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-[#111] p-10 rounded-3xl border border-[#d4af37]/20 shadow-2xl">
      <div className="mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-2xl font-serif text-[#d4af37] italic">إضافة قطعة ذهب جديدة</h2>
        <p className="text-gray-500 text-sm mt-1">املاً البيانات لتظهر القطعة في صفحة الشوب فوراً</p>
      </div>

      <form onSubmit={handleSend} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs mb-2 mr-1">اسم المنتج</label>
          <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="مثال: خاتم سوليتير ملكي" className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37] transition-all" required />
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-2 mr-1">الفئة</label>
          <select 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
            className="w-full bg-black text-white border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37] cursor-pointer appearance-none"
            required
          >
            <option value="Rings">Rings (خواتم)</option>
            <option value="Necklaces">Necklaces (سلاسل)</option>
            <option value="Earrings">Earrings (حلقان)</option>
            <option value="Bracelets">Bracelets (أساور)</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-2 mr-1">العيار</label>
          <input name="karat" type="text" value={formData.karat} onChange={handleChange} placeholder="21 أو 18" className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37]" required />
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-2 mr-1">الماركة</label>
          <input name="brand" type="text" value={formData.brand} onChange={handleChange} placeholder="لازوردي / إيجيبت جولد" className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37]" />
        </div>

        <div>
          <label className="block text-gray-400 text-xs mb-2 mr-1">الوزن (جرام)</label>
          <input name="weight" type="text" value={formData.weight} onChange={handleChange} placeholder="مثال: 5.2" className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37]" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-400 text-xs mb-2 mr-1">رابط صورة المنتج (URL)</label>
          <input name="image" type="text" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37]" />
        </div>

        <button 
          disabled={loading} 
          className="md:col-span-2 mt-4 bg-gradient-to-r from-[#d4af37] to-[#f2d06b] text-black font-black py-5 rounded-2xl hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? 'جاري الحفظ في القاعدة...' : 'اعتماد ونشر المنتج'}
        </button>
      </form>
    </div>
  );
};

export default ShopProductsForm;