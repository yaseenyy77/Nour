import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';
import { Plus, X, Loader2 } from 'lucide-react';

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Ring', 
    karat: '21K', 
    weight: '', 
    brand: "L'azurde",
    image: '', 
  });

  // مصفوفة لتخزين روابط الصور الإضافية
  const [extraImages, setExtraImages] = useState(['']); 
  
  const addMutation = useAddProduct();

  // إضافة حقل جديد للصور
  const addImageInput = () => {
    setExtraImages([...extraImages, '']);
  };

  // حذف حقل معين
  const removeImageInput = (index) => {
    const newImages = extraImages.filter((_, i) => i !== index);
    setExtraImages(newImages);
  };

  // تحديث رابط صورة معينة
  const handleImageChange = (index, value) => {
    const newImages = [...extraImages];
    newImages[index] = value;
    setExtraImages(newImages);
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    // تصفية المصفوفة من الروابط الفارغة
    const filteredImages = extraImages.filter(url => url.trim() !== "");

    const finalData = {
      ...formData,
      images: filteredImages 
    };

    addMutation.mutate(finalData, {
      onSuccess: () => {
        setFormData({ name: '', category: 'Ring', karat: '21K', weight: '', brand: "L'azurde", image: '' });
        setExtraImages(['']);
        alert("تمت إضافة المنتج بنجاح! ✨");
        if (onProductAdded) onProductAdded();
      },
      onError: (error) => {
        alert("حدث خطأ أثناء الإضافة، تأكد من صحة البيانات والاتصال.");
        console.error(error);
      }
    });
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-gray-50 p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-inner max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Product Name</label>
          <input required placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none focus:border-[#d4af37] transition-all bg-white" />
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Category</label>
          <select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none bg-white">
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earring">Earring</option>
          </select>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Weight (G)</label>
          <input required placeholder="5.5" value={formData.weight} onChange={(e)=>setFormData({...formData, weight: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none focus:border-[#d4af37] bg-white" />
        </div>

        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Main Image URL</label>
          <input required placeholder="https://..." value={formData.image} onChange={(e)=>setFormData({...formData, image: e.target.value})} className="w-full p-4 rounded-2xl border-2 font-bold outline-none focus:border-[#d4af37] bg-white" />
        </div>

        {/* قسم الصور الإضافية الديناميكي */}
        <div className="md:col-span-2 space-y-4">
          <label className="text-[10px] font-black uppercase text-blue-600 mb-2 block ml-2">Additional Images</label>
          {extraImages.map((url, index) => (
            <div key={index} className="flex gap-2 animate-in slide-in-from-left-2 duration-300">
              <input 
                placeholder={`Image URL ${index + 1}`} 
                value={url} 
                onChange={(e) => handleImageChange(index, e.target.value)} 
                className="flex-1 p-4 rounded-2xl border-2 font-bold outline-none focus:border-blue-400 bg-white" 
              />
              {index === extraImages.length - 1 ? (
                <button type="button" onClick={addImageInput} className="p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-md">
                  <Plus size={24} />
                </button>
              ) : (
                <button type="button" onClick={() => removeImageInput(index)} className="p-4 bg-red-100 text-red-500 rounded-2xl hover:bg-red-200 transition-all">
                  <X size={24} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button disabled={addMutation.isPending} className="w-full bg-[#123456] text-white p-6 rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 mt-8">
        {addMutation.isPending ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Adding to Collection...
          </>
        ) : 'Confirm and Add Product'}
      </button>
    </form>
  );
};

export default ShopProductsForm;