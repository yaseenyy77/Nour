import React, { useState, useEffect } from 'react';
import ShopProductsForm from './ShopProductsForm'; // عشان في نفس المجلد
import { supabase } from '../../../../supabaseClient'; // طلعنا 4 مستويات لبره
import { Trash2, ArrowLeft, Plus, List, Loader2, Package } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Fetch error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this royal piece?')) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) {
          alert("Database Error: " + error.message);
        } else {
          setProducts(prev => prev.filter(p => p.id !== id));
          alert('Piece deleted successfully! ✨');
        }
      } catch (err) {
        alert("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 border-b-4 border-[#123456] pb-8 gap-4">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-[#123456]">
            <ArrowLeft size={32} />
          </button>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#123456]">Shop Inventory</h2>
            <p className="text-[#446688] text-sm font-medium tracking-[0.3em]">ROYAL COLLECTION</p>
          </div>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a4a7a] transition-all shadow-xl">
          {showForm ? <List size={22} /> : <Plus size={22} />}
          {showForm ? 'View Collection' : 'Add New Piece'}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto">
          <ShopProductsForm onProductAdded={() => { fetchProducts(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-32 flex flex-col items-center justify-center text-[#123456]">
              <Loader2 className="animate-spin mb-4" size={48} />
              <p className="font-black tracking-[0.2em]">LOADING VAULT...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6 uppercase text-xs tracking-widest font-black">Piece</th>
                  <th className="p-6 uppercase text-xs tracking-widest font-black">Details</th>
                  <th className="p-6 uppercase text-xs tracking-widest font-black">Specs</th>
                  <th className="p-6 uppercase text-xs tracking-widest font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="p-6">
                      <img src={p.image} alt="" className="w-20 h-20 object-cover rounded-2xl border-2 border-white" />
                    </td>
                    <td className="p-6">
                      <div className="font-black text-[#123456] text-xl">{p.name}</div>
                      <span className="px-2 py-1 bg-gray-100 text-[#446688] text-[10px] font-black rounded uppercase">{p.category}</span>
                    </td>
                    <td className="p-6 text-[#123456] font-bold">{p.karat}K | {p.weight}g</td>
                    <td className="p-6 text-center">
                      <button onClick={() => handleDelete(p.id)} className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && products.length === 0 && <div className="p-20 text-center text-gray-400 italic">Vault is empty.</div>}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;