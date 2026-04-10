import React, { useState, useEffect } from 'react';
import SliderForm from './SliderForm'; 
import { supabase } from '../../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, List, Loader2 } from 'lucide-react';

const SliderManagement = ({ onBack }) => {
  const [sliders, setSliders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchSliders = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('sliders').select('*').order('created_at', { ascending: false });
    if (!error) setSliders(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSliders(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this?')) {
      const { error } = await supabase.from('sliders').delete().eq('id', id);
      if (!error) setSliders(prev => prev.filter(s => s.id !== id));
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
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4af37] transition-all">
          {showForm ? <><List size={18}/> View All</> : <><Plus size={18}/> Add Item</>}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-2xl mx-auto"><SliderForm onSliderAdded={() => { fetchSliders(); setShowForm(false); }} /></div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex justify-center"><Loader2 className="animate-spin text-[#d4af37]" size={40} /></div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-[#123456]">
                <tr>
                  <th className="p-5 text-[10px] font-black uppercase">Preview</th>
                  <th className="p-5 text-[10px] font-black uppercase">Category</th>
                  <th className="p-5 text-[10px] font-black uppercase">Details</th>
                  <th className="p-5 text-[10px] font-black uppercase text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sliders.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-5">
                      <img src={s.image} className="w-16 h-20 object-cover rounded-lg shadow-sm" alt="Product" />
                    </td>
                    <td className="p-5">
                      <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[10px] font-black uppercase">
                        {s.category}
                      </span>
                    </td>
                    <td className="p-5 font-bold text-[#123456]">
                      {s.karat} <span className="text-gray-300 mx-2">|</span> {s.weight}g
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => handleDelete(s.id)} className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default SliderManagement;