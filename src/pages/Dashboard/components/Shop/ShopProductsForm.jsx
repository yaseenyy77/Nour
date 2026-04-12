import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Ring', 
    karat: '21K', 
    weight: '', 
    brand: "L'azurde",
    image: '', 
    images: '' // سيتم تخزين الروابط كنص هنا ثم تحويلها لـ Array
  });
  
  const addMutation = useAddProduct();

  const handleSend = (e) => {
    e.preventDefault();
    
    // تحويل نص الصور الإضافية إلى مصفوفة (Array) كما يتطلب جدول Supabase
    const extraImagesArray = formData.images
      ? formData.images.split(',').map(url => url.trim()).filter(url => url !== "")
      : [];

    const finalData = {
      ...formData,
      images: extraImagesArray 
    };

    addMutation.mutate(finalData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Ring', karat: '21K', weight: '', brand: "L'azurde", image: '', images: '' });
        alert("تمت إضافة المنتج بنجاح! ✨");
        if (onProductAdded) onProductAdded();
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Product Name</label>
          <input required placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none focus:border-[#d4af37] transition-all" />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Category</label>
          <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none appearance-none bg-white">
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earring">Earring</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Karat</label>
          <select value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none appearance-none bg-white">
            <option value="18K">18K</option>
            <option value="21K">21K</option>
            <option value="24K">24K</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Main Image URL</label>
          <input required placeholder="https://..." value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none focus:border-[#d4af37]" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-blue-600 mb-2 block ml-2">Additional Images (Comma separated , )</label>
          <textarea 
            placeholder="https://img1.jpg, https://img2.jpg" 
            value={formData.images} 
            onChange={(e)=>setFormData({...formData, images: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 font-bold outline-none h-24 focus:border-blue-400" 
          />
        </div>
      </div>

      <button disabled={addMutation.isPending} className="w-full bg-[#123456] text-white p-6 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-xl disabled:opacity-50">
        {addMutation.isPending ? 'Processing...' : 'Add to Collection'}
      </button>
    </form>
  );
};

export default ShopProductsForm;