import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, ShieldCheck, Weight, Layers, BadgeCheck, Share2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useInventory } from '../hooks/useSliders'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  
  // جلب كل المنتجات والبحث عن المنتج المطلوب بالـ ID
  const { data: products = [], isLoading } = useInventory();
  const product = products.find(item => item.id.toString() === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const isFavorite = favorites.some(item => item.id === product?.id);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h2 className="text-2xl font-black text-[#001b44] uppercase">Piece Not Found</h2>
      <button onClick={() => navigate('/shop')} className="bg-[#001b44] text-white px-8 py-3 rounded-full font-bold">Back to Shop</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-32 pb-20 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* زر الرجوع */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-[#001b44] font-black uppercase text-[10px] tracking-widest mb-12 hover:text-[#d4af37] transition-all"
        >
          <div className="p-2 rounded-full bg-white shadow-sm group-hover:shadow-md transition-all">
            <ArrowLeft size={18} />
          </div>
          Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* القسم الأيسر: عرض الصورة */}
          <div className="relative group">
            <div className="aspect-[4/5] bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Badge البراند */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">{product.brand || "Royal Collection"}</p>
              </div>
            </div>
          </div>

          {/* القسم الأيمن: تفاصيل المنتج */}
          <div className="flex flex-col">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter">In Stock</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-[#001b44] uppercase italic tracking-tighter leading-tight mb-2">
                  {product.name}
                </h1>
            </div>

            {/* مواصفات القطعة في كروت صغيرة */}
            <div className="grid grid-cols-3 gap-4 my-10">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all text-center">
                <Weight className="text-[#d4af37] mx-auto mb-3" size={24} />
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Weight</p>
                <p className="text-lg font-black text-[#001b44]">{product.weight} G</p>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all text-center">
                <Layers className="text-[#d4af37] mx-auto mb-3" size={24} />
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Karat</p>
                <p className="text-lg font-black text-[#001b44]">{product.karat}</p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all text-center">
                <BadgeCheck className="text-[#d4af37] mx-auto mb-3" size={24} />
                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Category</p>
                <p className="text-lg font-black text-[#001b44]">{product.category || "Jewelry"}</p>
              </div>
            </div>

            {/* قسم الضمان فقط */}
            <div className="mb-10 text-left p-4 bg-gray-50 rounded-2xl flex items-start gap-4">
                <ShieldCheck className="text-[#d4af37] shrink-0" size={20} />
                <div>
                <h4 className="text-[11px] font-black text-[#001b44] uppercase mb-1">Lifetime Authenticity Guarantee</h4>
                <p className="text-[10px] text-gray-500 font-bold leading-relaxed">Official certificate of authenticity and gold purity stamp included with every piece.</p>
                </div>
            </div>

            {/* أزرار الأكشن */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => toggleFavorite({ id: product.id, name: product.name, image: product.image, weight: product.weight, material: product.karat })}
                className={`flex-1 py-6 rounded-[1.5rem] flex items-center justify-center gap-4 font-black uppercase text-[11px] tracking-[0.3em] transition-all duration-500 shadow-xl ${
                  isFavorite 
                  ? 'bg-red-500 text-white shadow-red-200' 
                  : 'bg-[#001b44] text-white hover:bg-[#d4af37] hover:shadow-yellow-100'
                }`}
              >
                <Heart size={20} className={isFavorite ? 'fill-white' : ''} />
                {isFavorite ? 'In Your Wishlist' : 'Add to Wishlist'}
              </button>

              <button className="p-6 rounded-[1.5rem] bg-white border border-gray-100 text-[#001b44] hover:bg-gray-50 transition-all shadow-sm">
                <Share2 size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;