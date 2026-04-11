import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Plus, List, Loader2, Package } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const { data: products = [], isLoading } = useInventory();
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id) => {
    if (window.confirm('تمسح القطعة دي يا وحش؟')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10 border-b-4 border-[#123456] pb-8">
        <button onClick={onBack} className="text-[#123456] p-2 hover:bg-gray-100 rounded-full transition-all"><ArrowLeft size={32} /></button>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#d4af37] transition-all shadow-lg shadow-blue-900/10"
        >
          {showForm ? <div className="flex items-center gap-2"><List size={18} /> View Inventory</div> : <div className="flex items-center gap-2"><Plus size={18} /> Add New Piece</div>}
        </button>
      </div>

      {showForm ? (
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-32 text-center text-[#123456]">
              <Loader2 className="animate-spin mx-auto mb-4" size={48} />
              <p className="font-black text-xs uppercase tracking-[0.3em]">Syncing Vault...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#123456] text-white">
                  <tr>
                    <th className="p-6 uppercase text-[10px] font-black tracking-widest">Piece</th>
                    <th className="p-6 uppercase text-[10px] font-black tracking-widest">Specs</th>
                    <th className="p-6 uppercase text-[10px] font-black tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-500" />
                          <span className="font-black text-[#123456] uppercase italic tracking-tighter">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col">
                          <span className="text-xs text-[#123456] font-black">{p.karat}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase">{p.weight}g | {p.category}</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          disabled={deleteMutation.isPending} 
                          className="text-red-500 p-3 hover:bg-red-50 rounded-xl transition-all"
                        >
                          {deleteMutation.isPending && deleteMutation.variables === p.id ? <Loader2 size={24} className="animate-spin" /> : <Trash2 size={24} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {products.length === 0 && (
                <div className="p-20 text-center text-gray-300">
                  <Package className="mx-auto mb-4 opacity-20" size={40} />
                  <p className="font-black uppercase tracking-[0.2em] text-xs">No items in inventory</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;