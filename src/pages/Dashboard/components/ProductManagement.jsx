import React, { useState, useEffect } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { supabase } from '../../../supabaseClient'; 
import { Trash2, ArrowLeft, Plus, List, Loader2 } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // جلب المنتجات من Supabase
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false }); // ترتيب الأحدث أولاً

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // دالة الحذف المحسنة
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this royal piece from the collection?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        } else {
          // تحديث الحالة فوراً في الواجهة
          setProducts(products.filter(p => p.id !== id));
          alert('Piece deleted successfully! ✨');
        }
      } catch (error) {
        alert('Error deleting item: ' + error.message);
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Sub-Header / Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 border-b-4 border-[#123456] pb-8 gap-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack} 
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-[#123456] border border-transparent hover:border-[#123456]/20"
          >
            <ArrowLeft size={28} />
          </button>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-[#123456]">Shop Inventory</h2>
            <p className="text-[#446688] text-sm font-medium tracking-widest">RARE PIECES COLLECTION</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[#123456] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-[#1a4a7a] transition-all shadow-xl active:scale-95"
        >
          {showForm ? <List size={22} /> : <Plus size={22} />}
          {showForm ? 'View Inventory' : 'Add New Piece'}
        </button>
      </div>

      {showForm ? (
        /* Form View */
        <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-300">
          <ShopProductsForm onProductAdded={() => { fetchProducts(); setShowForm(false); }} />
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[2.5rem] border-2 border-gray-100 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-[#123456]">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-bold tracking-widest">LOADING COLLECTION...</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#123456] text-white">
                <tr>
                  <th className="p-6 uppercase text-xs tracking-[0.2em] font-black">Image</th>
                  <th className="p-6 uppercase text-xs tracking-[0.2em] font-black">Item Details</th>
                  <th className="p-6 uppercase text-xs tracking-[0.2em] font-black">Specifications</th>
                  <th className="p-6 uppercase text-xs tracking-[0.2em] font-black text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-blue-50/40 transition-colors group">
                    <td className="p-6">
                      <div className="relative w-24 h-24">
                        <img 
                          src={p.image || 'https://via.placeholder.com/150'} 
                          alt={p.name} 
                          className="w-full h-full object-cover rounded-2xl shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-black text-[#123456] text-2xl mb-1">{p.name}</div>
                      <div className="inline-block px-3 py-1 bg-gray-100 text-[#446688] text-xs font-bold rounded-lg uppercase tracking-wider">
                        {p.category}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#123456] font-bold text-lg">{p.karat} Karat</span>
                        <span className="text-gray-400 font-mono text-sm">{p.weight} Grams</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all hover:scale-110 active:scale-90"
                          title="Delete Piece"
                        >
                          <Trash2 size={26} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!loading && products.length === 0 && (
            <div className="p-24 text-center">
              <Package size={60} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 italic text-lg font-light">The royal vault is currently empty.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;