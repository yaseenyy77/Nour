import React, { useState } from 'react';
import { useAddProduct } from '../../../../hooks/useSliders';
import { Plus, X, Loader2, UploadCloud } from 'lucide-react';
import { supabase } from '../../../../supabaseClient'; // تأكد من مسار ملف السوبابيس

const ShopProductsForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Ring', 
    karat: '21K', 
    weight: '', 
    brand: '', 
    image: null, // سيخزن ملف الصورة الأساسية
  });

  const [extraImages, setExtraImages] = useState([null]); // مصفوفة لتخزين ملفات الصور الإضافية
  const [uploading, setUploading] = useState(false);
  const addMutation = useAddProduct();

  // دالة مساعدة لرفع الملفات إلى سوبابيس
  const uploadFile = async (file) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products') // اسم الـ Bucket
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // 1. رفع الصورة الأساسية
      const mainImageUrl = await uploadFile(formData.image);

      // 2. رفع الصور الإضافية بالتوازي
      const extraImageUrls = await Promise.all(
        extraImages.filter(file => file !== null).map(file => uploadFile(file))
      );

      const finalData = {
        ...formData,
        image: mainImageUrl,
        images: extraImageUrls 
      };

      addMutation.mutate(finalData, {
        onSuccess: () => {
          setFormData({ name: '', category: 'Ring', karat: '21K', weight: '', brand: '', image: null });
          setExtraImages([null]);
          alert("تمت الإضافة بنجاح! ✨");
          if (onProductAdded) onProductAdded();
        },
        onError: (error) => {
          alert(`فشل الإرسال: ${error.message}`);
        }
      });
    } catch (error) {
      alert("خطأ أثناء رفع الصور، تأكد من إعدادات الـ Storage");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSend} className="space-y-6 bg-white p-6 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* الحقول النصية تظل كما هي تماماً */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Product Name</label>
          <input required placeholder="Item Name" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 outline-none focus:border-[#d4af37] focus:bg-white transition-all font-bold" />
        </div>

        {/* Category & Karat ... (تظل كما هي) */}
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

        {/* Main Image Upload - تم تغيير النوع إلى File */}
        <div className="md:col-span-2">
          <label className="text-[10px] font-black uppercase text-[#123456] mb-2 block ml-2">Main Image (File)</label>
          <div className="relative">
            <input 
              type="file" 
              accept="image/*"
              required 
              onChange={(e) => setFormData({...formData, image: e.target.files[0]})} 
              className="w-full p-4 rounded-2xl border-2 border-gray-50 bg-gray-50 font-bold outline-none focus:border-[#d4af37] focus:bg-white transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-white hover:file:bg-[#b8962d] cursor-pointer" 
            />
            {formData.image && <span className="absolute right-4 top-4 text-[#d4af37] text-xs">Selected ✅</span>}
          </div>
        </div>

        {/* Extra Images Upload - تم تغيير النوع إلى File */}
        <div className="md:col-span-2 space-y-3">
          <label className="text-[10px] font-black uppercase text-blue-600 mb-2 block ml-2 flex items-center gap-2">
            <Plus size={14} /> Additional Images Files
          </label>
          {extraImages.map((file, index) => (
            <div key={index} className="flex gap-2 group">
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  const newImages = [...extraImages];
                  newImages[index] = e.target.files[0];
                  setExtraImages(newImages);
                }} 
                className="flex-1 p-4 rounded-2xl border-2 border-blue-50 bg-blue-50/30 font-bold outline-none focus:border-blue-400 focus:bg-white transition-all file:rounded-full file:border-0 file:bg-blue-600 file:text-white" 
              />
              <button type="button" 
                onClick={index === extraImages.length - 1 ? () => setExtraImages([...extraImages, null]) : () => setExtraImages(extraImages.filter((_, i) => i !== index))} 
                className={`p-4 rounded-2xl transition-all ${index === extraImages.length - 1 ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-red-50 text-red-400'}`}>
                {index === extraImages.length - 1 ? <Plus size={20} /> : <X size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <button disabled={addMutation.isPending || uploading} className="w-full bg-[#001b44] text-white p-6 rounded-[2rem] font-black uppercase tracking-[0.2em] hover:bg-[#d4af37] transition-all shadow-2xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50">
        {(addMutation.isPending || uploading) ? <Loader2 className="animate-spin" size={20} /> : 'Confirm Royal Addition'}
      </button>
    </form>
  );
};

export default ShopProductsForm;