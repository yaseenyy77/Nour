import React, { useState } from 'react';
import { Trash2, ArrowLeft, Plus, List, Loader2 } from 'lucide-react';
// استدعاء الهوكس اللي عملناها في الخطوة الأولى
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders'; 
import ShopProductsForm from './ShopProductsForm';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  
  // 1. جلب البيانات أوتوماتيكياً
  const { data: products = [], isLoading } = useInventory();
  
  // 2. تفعيل هوك الحذف
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id) => {
    if (window.confirm('تمسح القطعة دي من المخزن نهائياً؟')) {
      // تنفيذ الحذف - بمجرد النجاح الجدول هيتحدث لوحده بفضل الـ invalidateQueries
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-10 border-b-4 border-[#123456] pb-8">
        <button onClick={onBack} className="flex items-center gap-2 font-black text-[#123456] uppercase text-xs hover:scale-105 transition-transform">
          <ArrowLeft size={24} /> Back
        </button>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#123456] text-white px-8 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:bg-[#d4af37] transition-all"
        >
          {showForm ? <><List size={18} /> View Inventory</> : <><Plus size={18} /> Add New Piece</>}
        </button>
      </div>

      {showForm ? (
        // هنظبط الفورم في الخطوة الجاية
        <ShopProductsForm onProductAdded={() => setShowForm(false)} />
      ) : (
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="p-32 text-center">
              <Loader2 className="animate-spin mx-auto text-[#123456]" size={48} />
              <p className="mt-4 font-black text-[#123456] tracking-widest uppercase text-xs">Loading Vault...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6 uppercase text-[10px] font-black tracking-widest">Piece</th>
                  <th className="p-6 uppercase text-[10px] font-black tracking-widest">Specs</th>
                  <th className="p-6 uppercase text-[10px] font-black tracking-widest text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={p.image} className="w-16 h-16 object-cover rounded-xl border-2 border-white shadow-sm" />
                        <span className="font-black text-[#123456] uppercase italic">{p.name}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-[10px]">{p.karat}K</span>
                      <span className="ml-2 text-[10px] uppercase">{p.weight}g</span>
                    </td>
                    <td className="p-6 text-center">
                      <button 
                        onClick={() => handleDelete(p.id)} 
                        disabled={deleteMutation.isPending}
                        className="text-red-500 p-3 hover:bg-red-50 rounded-xl transition-all disabled:opacity-30"
                      >
                        {deleteMutation.isPending && deleteMutation.variables === p.id ? 
                          <Loader2 className="animate-spin" size={20} /> : <Trash2 size={22} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!isLoading && products.length === 0 && (
            <div className="p-20 text-center text-gray-300 font-black uppercase tracking-[0.3em]">
              The vault is empty.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;