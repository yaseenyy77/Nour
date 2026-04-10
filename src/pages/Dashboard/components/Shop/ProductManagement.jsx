import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Plus, List, Loader2 } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  
  // نداء البيانات باستخدام React Query
  const { data: products = [], isLoading } = useInventory();
  const deleteMutation = useDeleteProduct();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this royal piece?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          // مش محتاجين ريفريش، الـ hook هيتصرف
        },
        onError: (err) => alert("Error: " + err.message)
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs">
          <ArrowLeft size={18} /> Back
        </button>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-6 py-3 rounded-xl font-black uppercase text-xs">
          {showForm ? 'View Inventory' : 'Add New Piece'}
        </button>
      </div>

      {showForm ? (
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          {isLoading ? (
            <div className="p-20 text-center"><Loader2 className="animate-spin mx-auto" /></div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-black uppercase text-[10px]">Image</th>
                  <th className="p-4 font-black uppercase text-[10px]">Name</th>
                  <th className="p-4 font-black uppercase text-[10px]">Specs</th>
                  <th className="p-4 text-center font-black uppercase text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t border-gray-50">
                    <td className="p-4"><img src={p.image} className="w-12 h-12 object-cover rounded-lg" /></td>
                    <td className="p-4 font-black text-[#123456]">{p.name}</td>
                    <td className="p-4 text-xs font-bold text-gray-500">{p.karat}K | {p.weight}g</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(p.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-500 p-2 hover:bg-red-50 rounded-lg"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === p.id ? '...' : <Trash2 size={18} />}
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

export default ProductManagement;