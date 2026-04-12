import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, LayoutGrid, Loader2 } from 'lucide-react';

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
    if (window.confirm('هل تريد مسح هذا العنصر من السلايدر؟')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) fetchSliders();
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b-4 border-[#001b44] pb-6 md:pb-8">
        <button onClick={onBack} className="text-[#001b44] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} className="md:w-8 md:h-8" />
        </button>
        <div className="text-center">
            <h2 className="text-[#001b44] font-black uppercase italic text-lg md:text-2xl tracking-tighter">Slider Manager</h2>
            <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Home Page Showcase</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#001b44] text-white px-4 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[8px] md:text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-2"
        >
          {showForm ? <><LayoutGrid size={14} /> <span>View Slider</span></> : <><Plus size={14} /> <span>Add From Inventory</span></>}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto py-4">
          <SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
              <p className="text-[#001b44] font-black uppercase text-xs tracking-widest">Syncing Sliders...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {sliders.map((s) => (
                <div key={s.id} className="group bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                  <div className="aspect-[4/5] bg-[#fcfcfc] relative overflow-hidden">
                    <img src={s.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Slider item" />
                    
                    <button onClick={() => handleDelete(s.id)} className="absolute top-2 right-2 p-2 bg-red-50/90 backdrop-blur-sm text-red-500 rounded-xl lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm z-10">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="p-3 md:p-5">
                    <h3 className="font-black text-[#001b44] uppercase text-[10px] md:text-sm">{s.karat} Royal</h3>
                    <div className="flex justify-between items-center mt-1">
                      <p className="font-bold text-[#d4af37] text-[9px] md:text-xs">{s.weight} G</p>
                      <span className="text-[7px] md:text-[8px] bg-gray-100 px-2 py-1 rounded-md uppercase font-black text-gray-400">{s.category}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {sliders.length === 0 && (
                <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">السلايدر فارغ حالياً</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SliderManagement;