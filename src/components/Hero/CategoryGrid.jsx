import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CategoryGrid Component - نسخة الذهب والمجوهرات
 * يعرض 4 فئات رئيسية بصور ذهب فخمة وأزرار "Shop Now"
 */
const CategoryGrid = () => {
  
  // بيانات الأقسام مع صور ذهب حقيقية وروابط الأقسام
  const categories = [
    {
      id: 1,
      title: "Gold Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=rings"
    },
    {
      id: 2,
      title: "Luxury Necklaces",
      image: "https://images.unsplash.com/photo-1599643478518-a744c517b243?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=necklaces"
    },
    {
      id: 3,
      title: "Royal Bracelets",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=bracelets"
    },
    {
      id: 4,
      title: "Elegant Earrings",
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=earrings"
    }
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-16 overflow-hidden">
      {/* شبكة الصور: 2 في الصف للموبايل و 4 للديسك توب */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className="group flex flex-col items-center"
          >
            {/* حاوية الصورة بتأثير فخم */}
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#fafafa] mb-4 shadow-sm border border-gray-50">
              <Link to={cat.link} className="block w-full h-full">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </Link>
              
              {/* Overlay ذهبي خفيف جداً يظهر عند التحويم */}
              <div className="absolute inset-0 bg-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* تفاصيل القسم (العنوان والزر) */}
            <div className="text-center w-full px-2">
              <h3 className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#001b44] mb-3">
                {cat.title}
              </h3>
              
              <Link 
                to={cat.link}
                className="inline-flex items-center justify-center gap-2 bg-black text-white text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] py-3 px-6 transition-all duration-300 hover:bg-[#d4af37] hover:text-black w-full"
              >
                Shop Now
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* لمسة إضافية: أنيميشن دخول للسيكشن */}
      <style jsx>{`
        section {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default CategoryGrid;