import React, { useState, useEffect } from 'react';
import ShopProductsForm from './components/ShopProductsForm';
import { supabase } from '../../supabaseClient'; 
import { Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب المنتجات من القاعدة
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (!error) setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // دالة الحذف
  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
        alert('تم الحذف بنجاح');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-[#d4af37] text-4xl font-serif italic mb-2 uppercase tracking-widest">Nour Dashboard</h1>
      </div>
      
      <div className="flex bg-[#111] p-1 rounded-2xl border border-gray-800 mb-10 shadow-xl">
        <button onClick={() => setActiveTab('shop')} className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'shop' ? 'bg-[#d4af37] text-black' : 'text-gray-500'}`}>إضافة منتج</button>
        <button onClick={() => setActiveTab('manage')} className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'manage' ? 'bg-[#d4af37] text-black' : 'text-gray-500'}`}>إدارة المنتجات</button>
      </div>

      <div className="w-full max-w-5xl">
        {activeTab === 'shop' && <ShopProductsForm onProductAdded={fetchProducts} />}
        
        {activeTab === 'manage' && (
          <div className="bg-[#111] rounded-3xl border border-gray-800 overflow-hidden" dir="rtl">
            <table className="w-full text-right">
              <thead className="bg-[#1a1a1a] text-[#d4af37] text-sm uppercase">
                <tr>
                  <th className="p-4">الصورة</th>
                  <th className="p-4">الاسم</th>
                  <th className="p-4">الفئة</th>
                  <th className="p-4">الوزن</th>
                  <th className="p-4">التحكم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-black/50 transition-colors">
                    <td className="p-4">
                      <img src={product.image} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-700" />
                    </td>
                    <td className="p-4 font-bold">{product.name}</td>
                    <td className="p-4 text-gray-400">{product.category}</td>
                    <td className="p-4 text-gray-400">{product.weight} جرام</td>
                    <td className="p-4 flex gap-4">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && <div className="p-10 text-center text-gray-600 italic">لا توجد منتجات حالياً</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;