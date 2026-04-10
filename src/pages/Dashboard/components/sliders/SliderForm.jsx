import React, { useState } from 'react';
import { supabase } from '../../../../supabaseClient'; 

const SliderForm = ({ onSliderAdded }) => {
  const [formData, setFormData] = useState({
    image: '', weight: '', karat: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.from('sliders').insert([formData]);
    
    if (!error) {
      alert("Slider Item Added Successfully! ✨");
      setFormData({ image: '', weight: '', karat: '' });
      if (onSliderAdded) onSliderAdded();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem] border-2 border-[#123456]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="md:col-span-2">
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Image URL</label>
          <input required name="image" type="text" value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} placeholder="https://..." className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Weight (Grams)</label>
          <input required name="weight" type="text" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} placeholder="e.g. 15.5" className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
        <div>
          <label className="text-xs font-black uppercase text-[#123456] ml-2">Karat</label>
          <input required name="karat" type="text" value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} placeholder="e.g. 21K" className="w-full p-4 rounded-2xl border-2 border-white focus:border-[#123456] outline-none shadow-sm" />
        </div>
      </div>
      <button disabled={loading} className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#1a4a7a] transition-all shadow-lg">
        {loading ? 'Processing...' : 'Save Slider Item'}
      </button>
    </form>
  );
};

export default SliderForm;