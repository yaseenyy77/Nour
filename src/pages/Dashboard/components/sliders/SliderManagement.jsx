import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, LayoutGrid, Loader2, Sparkles, Tag } from 'lucide-react';

const SliderManagement = ({ onBack }) => {
  const [sliders, setSliders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSliders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sliders').select('*').order('created_at', { ascending: false });
    if (!error) setSliders(data);
    setLoading(false);
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('هل تريد إزالة هذا المنتج من العرض؟')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) fetchSliders();
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-6">
        <button onClick={onBack} className="text-[#001b44] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
            <h2 className="text-[#001b44] font-black uppercase italic text-xl tracking-tighter flex items-center gap-2">
              <Sparkles size={20} className="text-[#d4af37]" />
              Brand Gallery
            </h2>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#001b44] text-white px-5 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all flex items-center gap-2 shadow-lg">
          {showForm ? <LayoutGrid size={16} /> : <Plus size={16} />}
          <span>{showForm ? 'View Active' : 'Add From Inventory'}</span>
        </button>
      </div>

      {showForm ? (
        <SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {sliders.map((s) => (
            <div key={s.id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all relative">
              <div className="aspect-square bg-[#fcfcfc] p-4 relative">
                <img src={s.image} className="w-full h-full object-contain" alt="" />
                <button onClick={() => handleDelete(s.id)} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="p-4 border-t border-gray-50 text-center">
                <span className="text-[8px] bg-gray-50 px-2 py-1 rounded text-gray-400 font-black uppercase flex items-center justify-center gap-1 mb-2">
                  <Tag size={8} /> {s.category}
                </span>
                <p className="font-black text-[#001b44] text-[10px] uppercase truncate">{s.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SliderManagement;