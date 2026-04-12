import React from 'react';
import { Heart, Scale, ShieldCheck, Factory, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext'; 

/**
 * ShopProductCard Component
 * تم تعديل الارتفاع (قصر الكارت) وحذف سهم التحويم مع الحفاظ على التصميم الأصلي.
 * التركيز هنا على تقليل الفراغات الرأسية لجعل الكارت "أقصر".
 */
const ShopProductCard = ({ 
  id, 
  name, 
  image, 
  material, 
  weight, 
  manufacturer, 
  viewMode 
}) => {
  const isListView = viewMode === 1;
  const { favorites, toggleFavorite } = useFavorites();
  
  // فحص حالة المفضلة في السياق (Context)
  const isFavorite = favorites?.some(item => item.id === id);

  /**
   * معالج النقر على زر المفضلة
   * يمنع انتشار الحدث لضمان عدم الانتقال لصفحة المنتج عند الضغط على القلب
   */
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite({ id, name, image, material, weight });
    }
  };

  return (
    <div 
      className={`group relative bg-white transition-all duration-500 ease-in-out w-full border border-gray-50/50 hover:shadow-2xl ${
        isListView ? 'flex flex-row items-center p-3 gap-6' : 'flex flex-col'
      }`}
    >
      {/* --- قسم الصورة (Compact Size) --- 
          تم تقليل الـ mt-4 لتقصير المسافة العلوية
      */}
      <div className={`relative bg-[#fafafa] overflow-hidden self-center shrink-0 ${
        isListView 
          ? 'w-[100px] h-[110px]' 
          : 'w-[90%] aspect-[1/1.1] mt-2 mx-auto shadow-sm' 
      }`}>
        <Link to={`/product/${id}`} className="block w-full h-full">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000 group-hover:scale-110" 
          />
        </Link>
        
        {/* زر المفضلة العائم - تقليل الحجم قليلاً */}
        <button 
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-sm transition-all duration-300 ${
            isFavorite 
              ? 'text-red-500 scale-110' 
              : 'text-gray-400 md:opacity-0 group-hover:opacity-100 hover:text-red-500'
          }`}
        >
          <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* --- قسم المعلومات (Condensed Details) --- 
          تم تقليل الـ p-4 md:p-5 إلى p-2 md:p-3 لتقصير الارتفاع
      */}
      <div className={`flex flex-col flex-1 p-2 md:p-3 ${
        isListView ? 'text-left items-start' : 'items-center text-center'
      }`}>
        
        {/* المصنع - تقليل الـ mb-1.5 */}
        {manufacturer && (
          <div className="flex items-center gap-1.5 mb-1 opacity-80">
            <Factory size={10} className="text-[#d4af37]" />
            <span className="text-[9px] md:text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em] line-clamp-1">
              {manufacturer}
            </span>
          </div>
        )}

        {/* اسم المنتج - تقليل الـ mb-3 إلى mb-2 */}
        <Link to={`/product/${id}`} className="block w-full group/title">
          <h3 className="text-[13px] md:text-[14px] font-black text-black uppercase tracking-tight mb-2 leading-tight transition-colors group-hover/title:text-[#d4af37] line-clamp-1 px-1">
            {name}
          </h3>
        </Link>

        {/* فاصل جمالي - تقليل الـ mb-4 إلى mb-2 */}
        {(weight || material) && (
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent mb-2"></div>
        )}

        {/* شبكة المعلومات مع الأيقونات - جعلها أكثر انضغاطاً */}
        <div className={`flex items-center justify-center gap-4 w-full ${isListView ? 'justify-start gap-6' : ''}`}>
          
          {/* عرض الوزن */}
          {weight && (
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-black font-black">
                <Scale size={11} className="text-[#d4af37]" />
                <span className="text-[11px] md:text-[12px] tracking-tighter">
                  {weight}<span className="text-[8px] ml-0.5 font-medium">G</span>
                </span>
              </div>
              <span className="text-[6px] text-gray-400 uppercase font-bold tracking-widest">Weight</span>
            </div>
          )}
          
          {weight && material && (
            <div className="w-[1px] h-5 bg-gray-100"></div>
          )}

          {/* عرض العيار */}
          {material && (
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-black font-black">
                <ShieldCheck size={11} className="text-[#d4af37]" />
                <span className="text-[11px] md:text-[12px] tracking-tighter">
                  {material}
                </span>
              </div>
              <span className="text-[6px] text-gray-400 uppercase font-bold tracking-widest">Purity</span>
            </div>
          )}
        </div>

        {/* تم حذف قسم الـ ChevronRight (السهم) بالكامل من هنا 
            لتقليص الارتفاع النهائي للكارت ومنع الإزاحة للأسفل عند التحويم.
        */}
      </div>
      
      {/* إطار التحويم الناعم */}
      <div className="absolute inset-0 border border-transparent group-hover:border-gray-50/50 pointer-events-none transition-colors duration-500"></div>

      {/* تعليقات إضافية لزيادة طول الملف كما طلبت ولشرح البنية:
          1. الحاوية الرئيسية تستخدم flex-col لضمان ترتيب العناصر رأسياً.
          2. تم استخدام line-clamp-1 بدلاً من line-clamp-2 في الاسم لتقصير المساحة.
          3. جميع الأيقونات تم تصغيرها بمقدار 1px لتناسب الحجم الجديد.
          4. المسافات (Gap) بين العناصر تم تقليلها للنصف تقريباً.
      */}
    </div>
  );
};

export default ShopProductCard;