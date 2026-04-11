import React, { useState } from 'react';
import ShopProductsForm from './ShopProductsForm';
import { useInventory, useDeleteProduct } from '../../../../hooks/useSliders';
import { Trash2, ArrowLeft, Plus, LayoutGrid, Loader2, Package, Tag, Scale } from 'lucide-react';

const ProductManagement = ({ onBack }) => {
  const [showForm, setShowForm] = useState(false);
  const { data: products = [], isLoading } = useInventory();
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id) => {
    if (window.confirm('هل أنت متأكد من مسح هذه القطعة من المخزن؟')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b-4 border-[#123456] pb-8">
        <button onClick={onBack} className="text-[#123456] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={32} />
        </button>
        <div className="text-center">
            <h2 className="text-[#123456] font-black uppercase italic text-2xl tracking-tighter">Inventory Vault</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Manage Your Royal Collection</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#123456] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-2"
        >
          {showForm ? <><LayoutGrid size={16} /> Show Inventory</> : <><Plus size={16} /> Add New Piece</>}
        </button>
      </div>

      {showForm ? (
        <div className="max-w-4xl mx-auto">
          <ShopProductsForm onProductAdded={() => setShowForm(false)} />
        </div>
      ) : (
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
              <p className="text-[#123456] font-black uppercase text-xs tracking-widest">Opening the Vault...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.id} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                  
                  {/* Image Holder */}
                  <div className="aspect-square bg-[#fcfcfc] relative overflow-hidden">
                    <img 
                      src={p.image} 
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" 
                      alt={p.name} 
                    />
                    
                    {/* Delete Overlay Button */}
                    <button 
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteMutation.isPending}
                      className="absolute top-4 right-4 p-3 bg-red-50 text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm"
                    >
                      {deleteMutation.isPending && deleteMutation.variables === p.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    </button>

                    <div className="absolute bottom-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black uppercase text-[#123456] border border-gray-100">
                            ID: {p.id.toString().slice(-4)}
                        </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-[#123456] font-black uppercase italic text-sm truncate w-2/3">{p.name}</h3>
                        <span className="text-[#d4af37] font-black text-xs">{p.karat}</span>
                    </div>

                    <div className="space-y-2 border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Tag size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{p.category || 'Uncategorized'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Scale size={12} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{p.weight} Grams</span>
                        </div>
                        {p.brand && (
                           <div className="mt-2 bg-gray-50 p-2 rounded-lg">
                               <p className="text-[8px] text-gray-400 font-bold uppercase">Brand</p>
                               <p className="text-[#123456] text-[10px] font-black uppercase">{p.brand}</p>
                           </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                  <Package className="mx-auto mb-4 text-gray-200" size={60} />
                  <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">The Vault is currently empty</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;