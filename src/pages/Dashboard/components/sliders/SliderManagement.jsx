import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, LayoutGrid, Loader2, Sparkles, Scale, Tag } from 'lucide-react';

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
      {/* Header المطور */}
      <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-6">
        <button onClick={onBack} className="text-[#001b44] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
            <h2 className="text-[#001b44] font-black uppercase italic text-xl tracking-tighter flex items-center gap-2">
              <Sparkles size={20} className="text-[#d4af37]" />
              Active Showcase
            </h2>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">المنتجات المعروضة حالياً في السلايدر</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#001b44] text-white px-5 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-2"
        >
          {showForm ? <LayoutGrid size={16} /> : <Plus size={16} />}
          <span>{showForm ? 'View All' : 'Add New'}</span>
        </button>
      </div>

      {showForm ? (
        <div className="max-w-5xl mx-auto py-2">
          <SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="w-full">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
              <p className="text-[#001b44] font-black uppercase text-xs tracking-widest">Loading Showcase...</p>
            </div>
          ) : (
            /* Grid: 2 items on mobile, 4 on desktop for better visibility */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {sliders.map((s) => (
                <div key={s.id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                  {/* Image Container */}
                  <div className="aspect-[1/1.2] bg-[#fcfcfc] relative overflow-hidden p-4">
                    <img src={s.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" alt="Slider item" />
                    
                    {/* Delete Action Overlay */}
                    <button 
                      onClick={() => handleDelete(s.id)} 
                      className="absolute top-3 right-3 p-2.5 bg-red-500 text-white rounded-xl shadow-lg lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95 z-10"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="absolute top-3 left-3">
                      <span className="bg-[#001b44] text-[#d4af37] px-3 py-1 rounded-lg text-[9px] font-black italic shadow-sm">
                        {s.karat}
                      </span>
                    </div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="p-5 bg-white border-t border-gray-50">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[8px] bg-gray-100 px-2 py-1 rounded-md uppercase font-black text-gray-400 flex items-center gap-1">
                          <Tag size={8} /> {s.category}
                        </span>
                    </div>
                    <div className="flex items-end justify-between">
                       <p className="font-black text-[#001b44] text-sm uppercase italic">Royal Piece</p>
                       <p className="font-bold text-[#d4af37] text-xs flex items-center gap-1">
                         <Scale size={12} /> {s.weight} G
                       </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {sliders.length === 0 && (
                <div className="col-span-full py-24 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-black uppercase text-xs tracking-[0.2em]">السلايدر فارغ، اضغط على Add New للبدء</p>
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