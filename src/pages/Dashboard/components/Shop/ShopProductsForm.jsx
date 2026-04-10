import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient'; // تعديل المسار هنا برضه

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '', category: 'Rings', karat: '', brand: '', weight: '', image: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('products').insert([formData]);
    if (!error) {
      alert("Added to Collection!");
      setFormData({ name: '', category: 'Rings', karat: '', brand: '', weight: '', image: '' });
      if (onProductAdded) onProductAdded();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem] border-2 border-[#123456]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="md:col-span-2">
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Item Name</label>
          <input required name="name" type="text" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Category</label>
          <select name="category" value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm">
            <option>Rings</option><option>Necklaces</option><option>Earrings</option><option>Bracelets</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Karat</label>
          <input required name="karat" type="text" value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Image URL</label>
          <input name="image" type="text" value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
      </div>
      <button disabled={loading} className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#1a4a7a] transition-all shadow-lg">
        {loading ? 'Processing...' : 'Save to Inventory'}
      </button>
    </form>
  );
};

export default ShopProductsForm;