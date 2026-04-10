import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, List, Loader2, Image as ImageIcon } from 'lucide-react';

const SliderManagement = ({ onBack }) => {
  const [sliders, setSliders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSliders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sliders')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSliders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item from slider?')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) setSliders(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 font-sans">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 border-b-4 border-[#123456] pb-8 gap-4">
        <div className="flex items-center gap-6 text-left">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-[#123456]">
            <ArrowLeft size={32} />
          </button>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#123456]">Collections</h2>
            <p className="text-[#d4af37] text-xs font-black tracking-[0.4em] uppercase">Slider Control Center</p>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#d4af37] transition-all shadow-xl">
          {showForm ? <List size={20} /> : <Plus size={20} />}
          {showForm ? 'View List' : 'Add New Item'}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto"><SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} /></div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-32 flex flex-col items-center justify-center text-[#123456]"><Loader2 className="animate-spin mb-4" size={48} /></div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6 uppercase text-[10px] tracking-widest font-black text-center">Preview</th>
                  <th className="p-6 uppercase text-[10px] tracking-widest font-black">Category</th>
                  <th className="p-6 uppercase text-[10px] tracking-widest font-black">Details</th>
                  <th className="p-6 uppercase text-[10px] tracking-widest font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sliders.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-6 flex justify-center">
                      <img src={s.image} className="w-20 h-24 object-cover rounded-xl shadow-md border-2 border-white" />
                    </td>
                    <td className="p-6">
                      <span className="bg-[#d4af37]/10 text-[#d4af37] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-[#d4af37]/20">
                        {s.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="font-black text-[#123456]">{s.karat}</div>
                      <div className="text-gray-400 text-xs font-bold">{s.weight}g</div>
                    </td>
                    <td className="p-6 text-center">
                      <button onClick={() => handleDelete(s.id)} className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && sliders.length === 0 && <div className="p-20 text-center text-gray-300 font-black uppercase tracking-widest">No Items in Sliders</div>}
        </div>
      )}
    </div>
  );
};

export default SliderManagement;