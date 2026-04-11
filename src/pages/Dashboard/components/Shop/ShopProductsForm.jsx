import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Rings', // محدث للفئات المطلوبة
    karat: '21K', 
    weight: '', 
    brand: "L'azurde",
    image: '' 
  });
  
  const addMutation = useAddProduct();

  const handleSend = (e) => {
    e.preventDefault();
    addMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Rings', karat: '21K', weight: '', brand: "L'azurde", image: '' });
        if (onProductAdded) onProductAdded();
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Product Name</label>
          <input 
            required
            placeholder="Name" 
            value={formData.name} 
            onChange={(e)=>setFormData({...formData, name: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 outline-none focus:border-[#123456] transition-all font-bold" 
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Category</label>
          <select 
            value={formData.category} 
            onChange={(e)=>setFormData({...formData, category: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none"
          >
            <option value="Rings">Rings</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Earrings">Earrings</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Brand</label>
          <select 
            value={formData.brand} 
            onChange={(e)=>setFormData({...formData, brand: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none"
          >
            <option value="L'azurde">L'azurde</option>
            <option value="Egypt Gold">Egypt Gold</option>
            <option value="Jawhara">Jawhara</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Karat</label>
          <select 
            value={formData.karat} 
            onChange={(e)=>setFormData({...formData, karat: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none"
          >
            <option value="18K">18K</option>
            <option value="21K">21K</option>
            <option value="24K">24K</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Weight (g)</label>
          <input 
            required 
            placeholder="e.g. 5.2" 
            value={formData.weight} 
            onChange={(e)=>setFormData({...formData, weight: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none" 
          />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Image URL</label>
          <input 
            required 
            placeholder="https://..." 
            value={formData.image} 
            onChange={(e)=>setFormData({...formData, image: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none" 
          />
        </div>
      </div>

      <button 
        disabled={addMutation.isPending} 
        className="w-full bg-[#123456] text-white p-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-lg active:scale-95"
      >
        {addMutation.isPending ? 'Saving to Vault...' : 'Confirm & Save Piece'}
      </button>
    </form>
  );
};

export default ShopProductsForm;