import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, List } from 'lucide-react';

const SliderManagement = ({ onBack }) => {
  const [sliders, setSliders] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchSliders = async () => {
    const { data, error } = await supabase.from('sliders').select('*').order('created_at', { ascending: false });
    if (!error) setSliders(data);
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('هل تريد مسح هذا العنصر من السلايدر؟')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) fetchSliders();
    }
  };

  return (
    <div className="w-full font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-all text-[#123456]">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-[#123456]">Slider Manager</h2>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#123456] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4af37] transition-all"
        >
          {showForm ? <><List size={18}/> View All</> : <><Plus size={18}/> Add New Item</>}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-2xl mx-auto py-10 animate-in slide-in-from-bottom-4 duration-500">
          <SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sliders.map((s) => (
            <div key={s.id} className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm group relative">
              <img src={s.image} className="w-full aspect-[4/5] object-cover rounded-2xl mb-4 shadow-inner" />
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-black text-[#123456] uppercase text-sm">{s.karat} Royal</h3>
                  <p className="font-bold text-[#d4af37]">{s.weight} G</p>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md uppercase font-black text-gray-400">{s.category}</span>
                </div>
                <button onClick={() => handleDelete(s.id)} className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderManagement;