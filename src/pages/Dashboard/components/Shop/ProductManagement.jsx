import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Plus, List, Loader2 } from 'lucide-react';

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
    <div className="w-full">
      <div className="flex justify-between mb-10 border-b-4 border-[#123456] pb-8">
        <button onClick={onBack} className="text-[#123456]"><ArrowLeft size={32} /></button>
        <button onClick={() => setShowForm(!showForm)} className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black">
          {showForm ? 'View Inventory' : 'Add New Piece'}
        </button>
      </div>

      {showForm ? (
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-32 text-center"><Loader2 className="animate-spin mx-auto" size={48} /></div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6">Piece</th>
                  <th className="p-6">Details</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50">
                    <td className="p-6"><img src={p.image} className="w-20 h-20 object-cover rounded-2xl" /></td>
                    <td className="p-6 font-black text-[#123456]">{p.name} <br/> <span className="text-xs text-gray-400">{p.karat}K</span></td>
                    <td className="p-6 text-center">
                      <button onClick={() => handleDelete(p.id)} disabled={deleteMutation.isPending} className="text-red-500">
                        <Trash2 size={24} />
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