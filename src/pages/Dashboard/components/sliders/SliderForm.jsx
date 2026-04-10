import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient'; 

const SliderForm = ({ onSliderAdded }) => {
  const [formData, setFormData] = useState({
    image: '', weight: '', karat: '', category: 'rings'
  });
  const [loading, setLoading] = useState(false);

  const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('sliders').insert([formData]);
    
    if (!error) {
      alert("Product added to " + formData.category + " slider!");
      setFormData({ image: '', weight: '', karat: '', category: 'rings' });
      if (onSliderAdded) onSliderAdded();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2rem] border-2 border-gray-100 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block tracking-widest">Slider Category</label>
          <select 
            value={formData.category} 
            onChange={(e)=>setFormData({...formData, category: e.target.value})}
            className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#d4af37] outline-none font-bold text-[#123456] transition-all"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block tracking-widest">Karat</label>
          <input required type="text" value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} placeholder="e.g. 21K" className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#123456] outline-none font-bold" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block tracking-widest">Image URL</label>
          <input required type="text" value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} placeholder="Paste image link here..." className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#123456] outline-none" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block tracking-widest">Weight (Grams)</label>
          <input required type="text" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} placeholder="e.g. 15.50" className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#123456] outline-none font-bold" />
        </div>
      </div>
      
      <button disabled={loading} className="w-full bg-[#123456] text-white p-5 rounded-xl font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-lg active:scale-95">
        {loading ? 'Adding...' : 'Add to Collection'}
      </button>
    </form>
  );
};

export default SliderForm;