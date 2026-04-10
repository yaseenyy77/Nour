import React, { useState, useEffect } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { supabase } from '../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, List } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this royal piece?')) {
      await supabase.from('products').delete().eq('id', id);
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="w-full">
      {/* Sub-Header */}
      <div className="flex items-center justify-between mb-10 border-b-4 border-[#123456] pb-6">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={32} className="text-[#123456]" />
          </button>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#123456]">Shop Management</h2>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#123456] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#1a4a7a] transition-all shadow-lg"
        >
          {showForm ? <List size={20} /> : <Plus size={20} />}
          {showForm ? 'View Inventory' : 'Add New Item'}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
          <ShopProductsForm onProductAdded={() => { fetchProducts(); setShowForm(false); }} />
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#123456] text-white">
              <tr>
                <th className="p-6 uppercase text-sm tracking-widest">Piece</th>
                <th className="p-6 uppercase text-sm tracking-widest">Details</th>
                <th className="p-6 uppercase text-sm tracking-widest">Karat/Weight</th>
                <th className="p-6 uppercase text-sm tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-6">
                    <img src={p.image} alt="" className="w-20 h-20 object-cover rounded-2xl shadow-md border-2 border-white" />
                  </td>
                  <td className="p-6">
                    <div className="font-black text-[#123456] text-xl">{p.name}</div>
                    <div className="text-[#446688] font-medium">{p.category}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-[#123456] font-bold">{p.karat}K</div>
                    <div className="text-sm text-gray-400 font-mono">{p.weight} grams</div>
                  </td>
                  <td className="p-6 text-center">
                    <button onClick={() => handleDelete(p.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                      <Trash2 size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <div className="p-20 text-center text-gray-400 italic">No items in the royal collection yet.</div>}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;