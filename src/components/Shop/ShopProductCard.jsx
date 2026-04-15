import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react'; 
import { useFavorites } from '../../context/FavoritesContext';

const ShopProductCard = (product) => {
  // سحب البيانات من البروبس (بما في ذلك مصفوفة الصور الإضافية)
  const { id, name, image, images = [], karat, weight, viewMode, brand, badge } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  // الحالة الخاصة بالصورة المعروضة حالياً (تبدأ بالصورة الأساسية)
  const [activeImage, setActiveImage] = useState(image);
  
  const isSingleColumn = viewMode === 1; 
  const isFavorite = favorites.some(item => item.id === id);

  // دمج الصورة الأساسية مع مصفوفة الصور الإضافية لعرض المصغرات
  const allImages = [image, ...images].slice(0, 5); 

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite({ id, name, image, weight, material: karat });
  };

  // تصميم مستوحى من الفيديو (Kobe Style) بدون أسعار
  const renderGridView = () => (
    <div 
      className="group flex flex-col bg-white h-full"
    >
      {/* منطقة الصورة الرئيسية */}
      <div 
        onClick={() => navigate(`/product/${id}`)}
        className="relative aspect-square w-full bg-[#f6f6f6] overflow-hidden mb-3 cursor-pointer"
      >
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#001b44] text-white text-[9px] uppercase tracking-widest px-2 py-1">
            {badge}
          </div>
        )}

        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-10 p-2"
        >
          <Heart size={20} className={`transition-colors duration-300 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-300 hover:text-black'}`} />
        </button>

        <img 
          src={activeImage} 
          className="w-full h-full object-contain p-6 transition-opacity duration-300" 
          alt={name} 
        />
      </div>

      {/* شريط الصور المصغرة (نفس ستايل الفيديو) */}
      <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
        {allImages.map((img, index) => (
          <div 
            key={index}
            onMouseEnter={() => setActiveImage(img)} // التغيير عند التمرير مثل المواقع الرياضية
            className={`w-12 h-12 min-w-[48px] bg-[#f6f6f6] border-b-2 cursor-pointer transition-all ${activeImage === img ? 'border-[#d4af37]' : 'border-transparent opacity-60'}`}
          >
            <img src={img} className="w-full h-full object-contain p-1" alt={`${name} view ${index}`} />
          </div>
        ))}
      </div>

      {/* معلومات المنتج (بدون سعر طبقاً لطلبك) */}
      <div className="flex flex-col text-left">
        <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest mb-1">{badge || "New Arrival"}</span>
        
        <h3 className="text-lg font-medium text-[#111] leading-tight mb-1">
          {name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-3">{brand || "Royal Jewelry"}</p>

        {/* عرض القيراط والوزن فقط */}
        <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase">Purity</span>
            <span className="text-sm font-semibold text-[#001b44]">{karat}</span>
          </div>
          <div className="w-[1px] h-6 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase">Weight</span>
            <span className="text-sm font-semibold text-[#001b44]">{weight} G</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ملاحظة: يمكنك تطبيق نفس المنطق على renderSingleColumnView إذا أردت
  return isSingleColumn ? renderSingleColumnView() : renderGridView();
};

export default ShopProductCard;