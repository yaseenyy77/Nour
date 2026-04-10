import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ name: '', category: 'Rings', karat: '', weight: '', image: '' });
  const addMutation = useAddProduct(); // استخدام هوك الإضافة

  const handleSend = (e) => {
    e.preventDefault();
    addMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Rings', karat: '', weight: '', image: '' });
        if (onProductAdded) onProductAdded(); // إغلاق الفورم بعد النجاح
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem] border-2 border-dashed">
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="col-span-2 p-4 rounded-2xl border-2 outline-none focus:border-[#123456]" />
        <input placeholder="Karat (e.g. 18)" value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} className="p-4 rounded-2xl border-2" />
        <input placeholder="Weight (g)" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} className="p-4 rounded-2xl border-2" />
        <input placeholder="Image URL" value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} className="col-span-2 p-4 rounded-2xl border-2" />
      </div>
      <button disabled={addMutation.isPending} className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-widest shadow-lg">
        {addMutation.isPending ? 'Adding to Vault...' : 'Save Product'}
      </button>
    </form>
  );
};

export default ShopProductsForm;