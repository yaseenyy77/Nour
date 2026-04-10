import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient'; 

const SliderForm = ({ onSliderAdded }) => {
  const [formData, setFormData] = useState({
    image: '', weight: '', karat: '', category: 'rings'
  });
  const [loading, setLoading] = useState(false);

  // الأقسام المتاحة
  const categories = ['rings', 'necklaces', 'bracelets', 'earrings'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('sliders').insert([formData]);
    
    if (!error) {
      alert("Added to " + formData.category + " successfully! ✨");
      setFormData({ image: '', weight: '', karat: '', category: 'rings' });
      if (onSliderAdded) onSliderAdded();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem] border-2 border-[#123456]/10 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-sans">
        
        <div className="md:col-span-1">
          <label className="text-[10px] font-black uppercase text-[#123456] ml-2 tracking-widest">Select Category</label>
          <select 
            value={formData.category} 
            onChange={(e)=>setFormData({...formData, category: e.target.value})}
            className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#d4af37] outline-none shadow-sm bg-white font-bold text-[#123456] cursor-pointer"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] ml-2 tracking-widest">Karat (e.g. 21K)</label>
          <input required type="text" value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} placeholder="21K" className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm font-bold" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] ml-2 tracking-widest">Image URL</label>
          <input required type="text" value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} placeholder="https://image-link.com/photo.jpg" className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] ml-2 tracking-widest">Weight (Grams)</label>
          <input required type="text" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} placeholder="12.50" className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm font-bold" />
        </div>
      </div>
      
      <button disabled={loading} className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all duration-500 shadow-xl">
        {loading ? 'UPLOADING...' : 'PUBLISH TO SLIDER'}
      </button>
    </form>
  );
};

export default SliderForm;