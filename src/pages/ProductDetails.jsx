import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, ShieldCheck, Weight, Share2, BadgeCheck } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useInventory } from '../hooks/useSliders'; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const { data: products = [], isLoading } = useInventory();
  
  const product = products.find(item => item.id.toString() === id);
  
  // State للصورة النشطة المعروضة حالياً
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(product.image); // الصورة الأساسية هي الافتراضية
    }
  }, [id, product]);

  const isFavorite = favorites.some(item => item.id === product?.id);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-black uppercase text-[#001b44] tracking-widest">Loading Royal Piece...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Piece Not Found</div>;

  // دمج الصورة الأساسية مع الصور الإضافية في مصفوفة واحدة للعرض
  const allImages = [product.image, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 pt-32">
        <button onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2 text-[#001b44] font-black uppercase text-[10px] tracking-widest hover:text-[#d4af37] transition-all group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* قسم الصور (المعرض) */}
          <div className="space-y-6">
            <div className="aspect-square bg-[#fcfcfc] rounded-[3rem] overflow-hidden border border-gray-50 shadow-inner p-10 relative">
              <img src={activeImage} className="w-full h-full object-contain animate-in fade-in zoom-in-95 duration-500" alt={product.name} />
              <div className="absolute top-8 left-8">
                <span className="bg-[#001b44] text-[#d4af37] px-5 py-2 rounded-full text-[11px] font-black italic shadow-lg">
                  {product.karat} Pure Gold
                </span>
              </div>
            </div>

            {/* شريط الصور المصغرة (Thumbnails) */}
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden border-2 transition-all duration-300 ${
                    activeImage === img ? 'border-[#d4af37] scale-105 shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* قسم البيانات */}
          <div className="flex flex-col pt-4">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[#d4af37] font-black uppercase text-[12px] tracking-[0.4em]">{product.brand || "Royal Jewelry"}</p>
                <button className="p-3 bg-gray-50 rounded-full text-gray-400 hover:text-[#001b44] transition-all"><Share2 size={20}/></button>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black text-[#001b44] uppercase mb-8 italic tracking-tighter leading-tight">{product.name}</h1>
              
              <div className="flex gap-8 mb-12 border-y border-gray-50 py-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#001b44]/5 flex items-center justify-center text-[#d4af37]"><Weight size={24} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Weight</p>
                    <p className="text-[#001b44] font-black text-lg">{product.weight} G</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#001b44]/5 flex items-center justify-center text-[#d4af37]"><ShieldCheck size={24} /></div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Purity</p>
                    <p className="text-[#001b44] font-black text-lg">{product.karat}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => toggleFavorite(product)}
                className={`w-full py-7 rounded-[2rem] flex items-center justify-center gap-4 font-black uppercase text-[12px] tracking-[0.3em] transition-all duration-500 shadow-2xl ${
                  isFavorite ? 'bg-red-500 text-white shadow-red-200' : 'bg-[#001b44] text-white hover:bg-[#d4af37]'
                }`}
              >
                <Heart size={22} className={isFavorite ? 'fill-white' : ''} />
                {isFavorite ? 'In Your Wishlist' : 'Add to Wishlist'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;