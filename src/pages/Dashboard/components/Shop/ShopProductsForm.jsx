import React, { useState } from 'react';
// استدعاء هوك الإضافة اللي عملناه في useSliders.js
import { useAddProduct } from '../../../../hooks/useSliders';
import { PlusCircle, Loader2, Image as ImageIcon, Ruler, hardDrive } from 'lucide-react';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Rings',
    karat: '',
    weight: '',
    brand: 'Royal',
    image: ''
  });

  // تفعيل هوك الإضافة
  const addMutation = useAddProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تنفيذ الإضافة
    addMutation.mutate(formData, {
      onSuccess: () => {
        alert("تمت إضافة القطعة الملكية بنجاح! ✨");
        // إعادة تهيئة الفورم
        setFormData({ name: '', category: 'Rings', karat: '', weight: '', brand: 'Royal', image: '' });
        // إغلاق الفورم والرجوع للجدول
        if (onProductAdded) onProductAdded();
      },
      onError: (err) => {
        alert("حصل خطأ وأنت بتضيف: " + err.message);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom duration-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] border-2 border-gray-100 shadow-2xl space-y-8">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-black text-[#123456] uppercase tracking-widest">Add New Masterpiece</h3>
          <p className="text-gray-400 text-xs font-bold mt-2">ENTER PIECE DETAILS TO UPDATE THE VAULT</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اسم المنتج */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-[#123456] uppercase mb-2 ml-2">Piece Name</label>
            <input 
              required
              type="text"
              placeholder="e.g. Royal Gold Ring"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#123456] focus:bg-white outline-none transition-all font-bold"
            />
          </div>

          {/* العيار */}
          <div>
            <label className="block text-[10px] font-black text-[#123456] uppercase mb-2 ml-2">Karat</label>
            <input 
              required
              type="text"
              placeholder="21K, 18K..."
              value={formData.karat}
              onChange={(e) => setFormData({...formData, karat: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#123456] outline-none transition-all font-bold"
            />
          </div>

          {/* الوزن */}
          <div>
            <label className="block text-[10px] font-black text-[#123456] uppercase mb-2 ml-2">Weight (Grams)</label>
            <input 
              required
              type="text"
              placeholder="5.2g"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#123456] outline-none transition-all font-bold"
            />
          </div>

          {/* القسم */}
          <div>
            <label className="block text-[10px] font-black text-[#123456] uppercase mb-2 ml-2">Category</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#123456] outline-none transition-all font-bold appearance-none"
            >
              <option>Rings</option>
              <option>Necklaces</option>
              <option>Earrings</option>
              <option>Bracelets</option>
            </select>
          </div>

          {/* رابط الصورة */}
          <div>
            <label className="block text-[10px] font-black text-[#123456] uppercase mb-2 ml-2">Image URL</label>
            <input 
              required
              type="text"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#123456] outline-none transition-all font-bold"
            />
          </div>
        </div>

        <button 
          disabled={addMutation.isPending}
          type="submit"
          className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {addMutation.isPending ? (
            <><Loader2 className="animate-spin" size={20} /> Securing Piece...</>
          ) : (
            <><PlusCircle size={20} /> Add to Collection</>
          )}
        </button>
      </form>
    </div>
  );
};

export default ShopProductsForm;