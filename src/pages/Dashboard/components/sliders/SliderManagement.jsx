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
    if (window.confirm('هل تريد حذف هذا العنصر من السلايدر؟')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) fetchSliders();
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b-4 border-[#001b44] pb-6">
        <button onClick={onBack} className="text-[#001b44] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
            <h2 className="text-[#001b44] font-black uppercase italic text-base md:text-xl tracking-tighter">Slider Manager</h2>
            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-widest">Home Page Showcase</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#001b44] text-white p-3 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-2"
        >
          {showForm ? <LayoutGrid size={14} /> : <Plus size={14} />}
          <span className="hidden sm:inline">{showForm ? 'View Slider' : 'Add New'}</span>
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto py-2">
          <SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
              <p className="text-[#001b44] font-black uppercase text-xs tracking-widest">جاري المزامنة...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {sliders.map((s) => (
                <div key={s.id} className="group bg-white rounded-[1.2rem] border border-gray-100 overflow-hidden relative">
                  <div className="aspect-[4/5] bg-[#fcfcfc] relative overflow-hidden">
                    <img src={s.image} className="w-full h-full object-cover" alt="Slider item" />
                    <button 
                      onClick={() => handleDelete(s.id)} 
                      className="absolute top-2 right-2 p-2 bg-red-50/90 backdrop-blur-sm text-red-500 rounded-lg lg:opacity-0 lg:group-hover:opacity-100 transition-all z-10"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between items-center">
                        <h3 className="font-black text-[#001b44] uppercase text-[9px]">{s.karat} Royal</h3>
                        <span className="text-[7px] bg-gray-100 px-1.5 py-0.5 rounded uppercase font-black text-gray-400">{s.category}</span>
                    </div>
                    <p className="font-bold text-[#d4af37] text-[9px] mt-1">{s.weight} G</p>
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