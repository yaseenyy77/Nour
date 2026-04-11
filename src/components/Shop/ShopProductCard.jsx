import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, Weight, Layers } from 'lucide-react'; 
import { useFavorites } from '../../context/FavoritesContext';

const ShopProductCard = (product) => {
  const { id, name, image, karat, weight, viewMode, brand, badge } = product;
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  
  const isSingleColumn = viewMode === 1; // حالة العمود الواحد
  const isFavorite = favorites.some(item => item.id === id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    toggleFavorite({ id, name, image, weight, material: karat });
  };

  // تنسيق العمود الواحد (صورة شمال، معلومات يمين) - التصميم الشيك والجديد
  const renderSingleColumnView = () => (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className="group bg-white rounded-[3rem] p-6 cursor-pointer transition-all duration-700 hover:shadow-[0_40px_90px_rgba(212,175,55,0.1)] hover:-translate-y-2 border border-[#f5f5f5] overflow-hidden flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto w-full relative"
    >
      {/* 🌟 تأثير لمعان الذهب الملكي 🌟 */}
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 z-20 pointer-events-none"></div>

      {/* 🖼️ قسم الصورة (الشمال) - تم تكبيره بشكل ملحوظ لملأ المساحة 🖼️ */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-[#fbfbfb] border border-gray-50 group-hover:border-[#d4af37]/10 transition-colors duration-500 flex items-center justify-center p-4 w-full md:w-2/5 aspect-[4/3] shrink-0">
        
        {/* البادج (فوق على الشمال) */}
        {badge && (
          <div className="absolute top-6 left-6 z-10 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#001b44] text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
            <Sparkles size={12} fill="#001b44" /> {badge}
          </div>
        )}

        {/* الصورة - تم تعديل الحجم لتملأ المساحة بشكل أكبر */}
        <img 
          src={image} 
          className="max-w-[85%] max-h-[85%] object-contain transition-transform duration-1000 group-hover:scale-105 drop-shadow-2xl" 
          alt={name} 
        />
        
        {/* تظليل سفلي ناعم جداً */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none"></div>
      </div>

      {/* 📝 قسم المعلومات (اليمين) - تم توسيعه وترتيبه 📝 */}
      <div className="flex-1 flex flex-col h-full text-center md:text-left p-6 relative">
        
        {/* زر القلب الشيك (فوق على اليمين) */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-0 right-0 p-4 rounded-full transition-all duration-500 z-10 backdrop-blur-md shadow-lg
            ${isFavorite 
              ? 'bg-red-50 opacity-100 scale-110' 
              : 'bg-white/70 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white'}`}
        >
          <Heart size={20} className={`transition-all duration-500 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-[#001b44]'}`} />
        </button>

        <div className="flex flex-col items-center md:items-start flex-1">
          <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.5em] mb-4">{brand || "Royal Collection"}</span>
          
          <h3 className="text-[#001b44] font-black uppercase italic tracking-tighter text-4xl md:text-5xl lg:text-6xl group-hover:text-[#d4af37] transition-colors line-clamp-2 leading-none mb-10">
            {name}
          </h3>

          {/* وصف مصغر لإعطاء فخامة */}
          <p className="text-gray-500 text-sm leading-relaxed mb-12 max-w-lg hidden md:block">
            Every piece from Royal Vault comes with an official certificate of authenticity and gold purity stamp. Secure insulated delivery ensured.
          </p>

          {/* مواصفات القطعة بتصميم "الكبسولات" (Pills) */}
          <div className="mt-auto flex justify-center md:justify-start gap-4 border-t border-gray-100 pt-8 w-full">
            <div className="flex-1 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold mb-1.5"><Weight size={12}/> WEIGHT</div>
              <p className="text-[#001b44] font-black text-2xl">{weight} <span className="text-sm text-gray-500 italic">GRAMS</span></p>
            </div>
            <div className="flex-1 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-400 uppercase tracking-widest text-[9px] font-bold mb-1.5"><Layers size={12}/> PURITY</div>
              <p className="text-[#001b44] font-black text-2xl">{karat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // تنسيق العمودين/الشبكة (Grid View) - التصميم القديم المحسن
  const renderGridView = () => (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className="group relative bg-white rounded-[2.5rem] p-3 cursor-pointer transition-all duration-700 hover:shadow-[0_30px_70px_rgba(212,175,55,0.1)] hover:-translate-y-2 border border-[#f8f8f8] overflow-hidden flex flex-col h-full"
    >
      {/* 🌟 تأثير اللمعان الملكي 🌟 */}
      <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 group-hover:translate-x-[150%] transition-transform duration-1000 z-20 pointer-events-none"></div>

      {/* 🖼️ قسم الصورة - تم تكبيره وجعله أنقى 🖼️ */}
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#fbfbfb] mb-6 flex items-center justify-center p-2 border border-gray-50 group-hover:border-[#d4af37]/20 transition-colors duration-500">
        
        {/* البادج الملكي */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-[#001b44] text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg shadow-yellow-500/10">
            <Sparkles size={10} fill="#001b44" /> {badge}
          </div>
        )}

        {/* زر القلب الشيك */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-500 z-10 backdrop-blur-sm shadow-inner
            ${isFavorite 
              ? 'bg-red-50 opacity-100 scale-110' 
              : 'bg-white/70 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-white'}`}
        >
          <Heart size={18} className={`transition-all duration-500 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-[#001b44]'}`} />
        </button>

        {/* الصورة الأساسية - تم تقليل البادينج لعرض أكبر */}
        <img 
          src={image} 
          className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-1000 group-hover:scale-105 drop-shadow-2xl" 
          alt={name} 
        />
        
        {/* تظليل سفلي ناعم جداً لإبراز الصورة */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent pointer-events-none"></div>
      </div>

      {/* قسم المعلومات - تم توسيعه قليلاً */}
      <div className="flex flex-col flex-1 px-4 pb-4 text-center">
        <span className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.3em] mb-2.5">{brand || "Royal Collection"}</span>
        
        <h3 className="text-[#001b44] font-black uppercase italic tracking-tighter text-xl leading-snug mb-5 group-hover:text-[#d4af37] transition-colors line-clamp-2 min-h-[56px]">
          {name}
        </h3>

        {/* مواصفات القطعة بتصميم Minimalist */}
        <div className="mt-auto flex justify-center gap-3 border-t border-gray-50 pt-5">
          <div className="text-center">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Weight</p>
            <p className="text-[#001b44] font-black text-sm">{weight} <span className="text-xs text-gray-500">g</span></p>
          </div>
          <div className="w-[1px] h-8 bg-gray-100"></div>
          <div className="text-center">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Purity</p>
            <p className="text-[#001b44] font-black text-sm">{karat}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return isSingleColumn ? renderSingleColumnView() : renderGridView();
};

export default ShopProductCard;