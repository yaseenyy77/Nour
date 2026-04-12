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
      {/* Header - تم تعديل المسافات وأحجام الخطوط للموبايل */}
      <div className="flex justify-between items-center mb-6 md:mb-10 border-b-4 border-[#001b44] pb-6 md:pb-8">
        <button onClick={onBack} className="text-[#001b44] p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} className="md:w-8 md:h-8" />
        </button>
        <div className="text-center px-2">
            <h2 className="text-[#001b44] font-black uppercase italic text-base md:text-2xl tracking-tighter">Inventory Vault</h2>
            <p className="text-[7px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.3em]">Manage Royal Collection</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-[#001b44] text-white px-3 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-widest hover:bg-[#d4af37] transition-all shadow-lg flex items-center gap-1 md:gap-2"
        >
          {showForm ? <LayoutGrid size={14} /> : <Plus size={14} />}
          <span className="hidden xs:inline">{showForm ? 'Show Inventory' : 'Add New'}</span>
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
              <p className="text-[#001b44] font-black uppercase text-xs tracking-widest">Opening the Vault...</p>
            </div>
          ) : (
            /* التعديل الجوهري: grid-cols-2 للموبايل */
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {products.map((p) => (
                <div key={p.id} className="group bg-white rounded-[1.2rem] md:rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 relative">
                  
                  {/* Image Holder */}
                  <div className="aspect-square bg-[#fcfcfc] relative overflow-hidden">
                    <img 
                      src={p.image} 
                      className="w-full h-full object-contain p-3 md:p-6 transition-transform duration-700 group-hover:scale-110" 
                      alt={p.name} 
                    />
                    
                    {/* زر الحذف: ظاهر دائماً على الموبايل، ومخفي بالهوفر فقط على الشاشات الكبيرة */}
                    <button 
                      onClick={() => handleDelete(p.id)}
                      disabled={deleteMutation.isPending}
                      className="absolute top-2 right-2 md:top-4 md:right-4 p-2 md:p-3 bg-red-50/90 backdrop-blur-sm text-red-500 rounded-lg md:rounded-2xl lg:opacity-0 lg:group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-sm z-10"
                    >
                      {deleteMutation.isPending && deleteMutation.variables === p.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>

                    <div className="absolute bottom-2 left-2">
                        <span className="bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[7px] md:text-[9px] font-black uppercase text-[#001b44] border border-gray-100">
                            ID: {p.id.toString().slice(-4)}
                        </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-3 md:p-6">
                    <div className="flex justify-between items-start mb-1 md:mb-3">
                        <h3 className="text-[#001b44] font-black uppercase italic text-[10px] md:text-sm truncate w-2/3">{p.name}</h3>
                        <span className="text-[#d4af37] font-black text-[9px] md:text-xs">{p.karat}</span>
                    </div>

                    <div className="space-y-1 md:space-y-2 border-t border-gray-50 pt-2 md:pt-4">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Tag size={10} className="md:w-3 md:h-3" />
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider">{p.category || 'Jewelry'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Scale size={10} className="md:w-3 md:h-3" />
                            <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-wider">{p.weight}g</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;