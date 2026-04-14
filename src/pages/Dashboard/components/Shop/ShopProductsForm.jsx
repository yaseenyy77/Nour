import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';
import { Plus, X, Loader2, AlertCircle } from 'lucide-react';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Ring', 
    karat: '21K', 
    weight: '', 
    brand: '', // تم جعلها فارغة افتراضياً للكتابة
    image: '', 
  });

  const [extraImages, setExtraImages] = useState(['']); 
  const addMutation = useAddProduct();

  const addImageInput = () => setExtraImages([...extraImages, '']);
  const removeImageInput = (index) => setExtraImages(extraImages.filter((_, i) => i !== index));
  const handleImageChange = (index, value) => {
    const newImages = [...extraImages];
    newImages[index] = value;
    setExtraImages(newImages);
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    const filteredImages = extraImages.filter(url => url.trim() !== "");

    const finalData = {
      ...formData,
      images: filteredImages 
    };

    console.log("Sending Data to Supabase:", finalData);

    addMutation.mutate(finalData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Ring', karat: '21K', weight: '', brand: '', image: '' });
        setExtraImages(['']);
        alert("تمت الإضافة بنجاح! ✨");
        if (onProductAdded) onProductAdded();
      },
      onError: (error) => {
        console.error("Supabase Mutation Error:", error);
        alert(`فشل الإرسال: ${error.message || 'مشكلة في الاتصال أو الصلاحيات'}`);
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Product Name</label>
          <input required placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 outline-none focus:border-[#d4af37] focus:bg-white transition-all font-bold" />
        </div>

        {/* Category & Karat */}
        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Category</label>
          <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all">
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earring">Earring</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Gold Karat</label>
          <select value={formData.karat} onChange={(e)=>setFormData({...formData, karat: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all">
            <option value="18K">18K</option>
            <option value="21K">21K</option>
            <option value="24K">24K</option>
          </select>
        </div>

        {/* Weight & Brand */}
        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Weight (G)</label>
          <input required type="number" step="0.01" placeholder="0.00" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all" />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Brand / House</label>
          <input 
            list="brand-options"
            placeholder="Type or Select Brand" 
            value={formData.brand} 
            onChange={(e)=>setFormData({...formData, brand: e.target.value})} 
            className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all" 
          />
          <datalist id="brand-options">
            {/* اتركها فارغة حالياً كما طلبت، سيتم اقتراح ما تكتبه يدوياً */}
          </datalist>
        </div>

        {/* Main Image */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Main Image (Cover)</label>
          <input required placeholder="https://..." value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all" />
        </div>

        {/* Dynamic Extra Images */}
        <div className="md:col-span-2 space-y-3">
          <label className="text-[10px] font-black uppercase text-blue-600 mb-2 block ml-2 flex items-center gap-2">
            <Plus size={14} /> Additional Images Gallery
          </label>
          {extraImages.map((url, index) => (
            <div key={index} className="flex gap-2 group">
              <input 
                placeholder={`Image URL ${index + 1}`} 
                value={url} 
                onChange={(e) => handleImageChange(index, e.target.value)} 
                className="flex-1 p-4 rounded-2xl border-2 border-blue-50 bg-blue-50/30 font-bold outline-none focus:border-blue-400 focus:bg-white transition-all" 
              />
              <button type="button" onClick={index === extraImages.length - 1 ? addImageInput : () => removeImageInput(index)} 
                className={`p-4 rounded-2xl transition-all ${index === extraImages.length - 1 ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-100' : 'bg-red-50 text-red-400 hover:bg-red-500 hover:text-white'}`}>
                {index === extraImages.length - 1 ? <Plus size={20} /> : <X size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button disabled={addMutation.isPending} className="w-full bg-[#001b44] text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-2xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50">
        {addMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Royal Addition'}
      </button>
    </form>
  );
};

export default ShopProductsForm;