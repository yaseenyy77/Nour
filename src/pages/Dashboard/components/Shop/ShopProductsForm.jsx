import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ name: '', category: 'Rings', karat: '', weight: '', image: '' });
  const addMutation = useAddProduct();

  const handleSend = (e) => {
    e.preventDefault();
    addMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Rings', karat: '', weight: '', image: '' });
        if (onProductAdded) onProductAdded();
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem]">
      <input placeholder="Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2" />
      {/* باقي الحقول بنفس الطريقة */}
      <button disabled={addMutation.isPending} className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black">
        {addMutation.isPending ? 'Saving...' : 'Save to Inventory'}
      </button>
    </form>
  );
};