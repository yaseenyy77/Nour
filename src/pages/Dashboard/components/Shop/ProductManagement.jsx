import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Loader2 } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const { data: products = [], isLoading } = useInventory(); // جلب البيانات عبر الهوك
  const deleteMutation = useDeleteProduct(); // هوك الحذف

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this royal piece?')) {
      deleteMutation.mutate(id); // تنفيذ الحذف فوراً
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10 border-b-4 border-[#123456] pb-8">
        <button onClick={onBack} className="text-[#123456] hover:scale-110 transition-transform"><ArrowLeft size={32} /></button>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black uppercase">
          {showForm ? 'View Inventory' : 'Add New Piece'}
        </button>
      </div>

      {showForm ? (
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-32 text-center"><Loader2 className="animate-spin mx-auto text-[#123456]" size={48} /></div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6 uppercase text-xs font-black">Piece</th>
                  <th className="p-6 uppercase text-xs font-black">Specs</th>
                  <th className="p-6 text-center uppercase text-xs font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-16 h-16 object-cover rounded-xl border" />
                        <span className="font-black text-[#123456]">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-gray-500">{p.karat}K | {p.weight}g</td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        disabled={deleteMutation.isPending}
                        className="text-red-500 p-3 hover:bg-red-50 rounded-xl transition-all disabled:opacity-30"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === p.id ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={24} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!isLoading && products.length === 0 && <div className="p-20 text-center text-gray-400 italic">No pieces found in the vault.</div>}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;