import React, { useState } from 'react';
// تصحيح المسارات: نطلع 4 مرات للوصول لـ src
import { useAddSlider } from '../../../../hooks/useSliders';
import { supabase } from '../../../../supabaseClient'; 

const SliderForm = ({ onSliderAdded }) => {
  const [formData, setFormData] = useState({
    image: '',
    weight: '',
    karat: '21K',
    category: 'rings'
  });

  const addSliderMutation = useAddSlider();

  const handleSubmit = async (e) => {
    e.preventDefault();
    addSliderMutation.mutate(formData, {
      onSuccess: () => {
        alert("تمت الإضافة بنجاح!");
        setFormData({ image: '', weight: '', karat: '21K', category: 'rings' });
        if (onSliderAdded) onSliderAdded();
      },
      onError: (error) => {
        alert("خطأ: " + error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Select */}
        <div className="md:col-span-1">
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-[0.2em]">Select Category</label>
          <select 
            value={formData.category} 
            onChange={(e)=>setFormData({...formData, category: e.target.value})}
            className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-[#d4af37] outline-none font-bold text-[#123456]"
          >
            <option value="rings">Rings (خواتم)</option>
            <option value="necklaces">Necklaces (سلاسل)</option>
            <option value="bracelets">Bracelets (أساور)</option>
            <option value="earrings">Earrings (حلقان)</option>
          </select>
        </div>

        {/* Karat Input */}
        <div>
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-[0.2em]">Karat (العيار)</label>
          <input 
            required
            type="text" 
            value={formData.karat} 
            onChange={(e)=>setFormData({...formData, karat: e.target.value})}
            className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 outline-none font-bold" 
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-[0.2em]">Image URL</label>
          <input 
            required
            type="text" 
            value={formData.image} 
            onChange={(e)=>setFormData({...formData, image: e.target.value})}
            placeholder="https://..." 
            className="w-full p-4 rounded-xl border-2 border-gray-50 bg-gray-50 outline-none" 
          />
        </div>

        {/* Weight */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-[0.2em]">Weight (G)</label>
          <input 
            required
            type="text" 
            value={formData.weight} 
            onChange={(e)=>setFormData({...formData, weight: e.target.value})}
            className="w-full p-5 rounded-xl border-2 border-gray-50 bg-gray-50 outline-none font-black text-2xl text-[#123456]" 
          />
        </div>
      </div>
      
      <button 
        disabled={addSliderMutation.isPending}
        className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all disabled:opacity-50"
      >
        {addSliderMutation.isPending ? 'Processing...' : 'Add to Home Slider'}
      </button>
    </form>
  );
};

export default SliderForm;