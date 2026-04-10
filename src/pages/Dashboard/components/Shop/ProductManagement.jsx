import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Plus, List, Loader2, Package } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const { data: products = [], isLoading } = useInventory();
  const deleteMutation = useDeleteProduct();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this royal piece?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => alert("Piece deleted successfully! ✨"),
        onError: (error) => alert("Error deleting: " + error.message)
      });
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <button onClick={onBack} className="flex items-center gap-3 text-[#123456] font-black uppercase tracking-widest text-xs hover:gap-5 transition-all w-fit">
          <ArrowLeft size={20} /> Back to Portal
        </button>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center justify-center gap-3 bg-[#123456] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#d4af37] transition-all shadow-xl shadow-blue-900/10">
          {showForm ? <><List size={18} /> View Inventory</> : <><Plus size={18} /> Add New Piece</>}
        </button>
      </div>

      {showForm ? (
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-[3rem] border-2 border-gray-50 overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto text-[#123456]" size={40} /></div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="p-6 text-[#123456] uppercase text-xs tracking-widest font-black">Piece</th>
                  <th className="p-6 text-[#123456] uppercase text-xs tracking-widest font-black">Details</th>
                  <th className="p-6 text-[#123456] uppercase text-xs tracking-widest font-black">Specs</th>
                  <th className="p-6 text-[#123456] uppercase text-xs tracking-widest font-black text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="p-6"><img src={p.image} className="w-20 h-20 object-cover rounded-2xl border-2 border-white" /></td>
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
          {!isLoading && products.length === 0 && <div className="p-20 text-center text-gray-300 font-bold uppercase tracking-widest">Vault is empty.</div>}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;