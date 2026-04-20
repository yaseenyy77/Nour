import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Scale, ShieldCheck, Bookmark } from 'lucide-react';

const CategoryGrid = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // بيانات المنتجات (البراند، الجرام، العيار)
  const trendingProducts = [
    {
      id: 1,
      name: "Saranghae Sign",
      brand: "Royal Goldsmith",
      weight: "2.43G",
      karat: "18K Gold",
      image: "https://images.unsplash.com/photo-1599643478518-a744c517b243?q=80&w=1000",
    },
    {
      id: 2,
      name: "Eternal Band",
      brand: "L'Essence",
      weight: "3.15G",
      karat: "21K Gold",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
    },
    {
      id: 3,
      name: "Majestic Chain",
      brand: "Heritage Joaillerie",
      weight: "12.20G",
      karat: "24K Gold",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
    },
    {
      id: 4,
      name: "Celestial Drop",
      brand: "Starlight Crafts",
      weight: "1.80G",
      karat: "18K Gold",
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000",
    }
  ];

  // دالة لتتبع السكرول وتحديث النقاط النشطة
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setActiveIndex(index);
    }
  };

  return (
    <section className="bg-[#fcfcfc] py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-16 lg:px-32 mb-16 flex flex-col md:flex-row items-baseline justify-between gap-4">
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.5em]"
          >
            Editor's Choice
          </motion.p>
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tighter text-[#1a1a1a]">
            Trending <span className="font-serif italic text-gray-300">Masterpieces</span>
          </h2>
        </div>
        
        <Link to="/shop" className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-all">
          Explore All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* منطقة العرض مع السحب الأفقي */}
      <div className="relative group">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 md:gap-10 overflow-x-auto px-6 md:px-16 lg:px-32 pb-16 hide-scrollbar snap-x snap-mandatory"
        >
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center"
            >
              <Link to={`/product/${product.id}`} className="block group/card">
                {/* الكارد الرئيسي */}
                <div className="relative aspect-square bg-white rounded-[2.5rem] overflow-hidden mb-8 border border-gray-50 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover/card:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.15)] group-hover/card:-translate-y-2">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-12 mix-blend-multiply group-hover/card:scale-105 transition-transform duration-1000"
                  />
                  
                  {/* علامة البراند العلوية */}
                  <div className="absolute top-8 left-8 flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-[#d4af37]/40"></div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{product.brand}</span>
                  </div>
                </div>

                {/* تفاصيل الجرام والعيار */}
                <div className="px-4 space-y-4">
                  <h3 className="text-xl font-light text-[#1a1a1a] tracking-tight">{product.name}</h3>
                  
                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      <Scale size={14} className="text-[#d4af37]" />
                      <span className="text-xs font-medium text-gray-500">{product.weight}</span>
                    </div>
                    <div className="w-[1px] h-3 bg-gray-200"></div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#d4af37]" />
                      <span className="text-xs font-medium text-gray-500">{product.karat}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* نقاط الإرشاد (Pagination Dots) */}
        <div className="flex justify-center gap-3 mt-4">
          {trendingProducts.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIndex === idx ? 'w-8 bg-[#d4af37]' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; scroll-behavior: smooth; }
      `}} />
    </section>
  );
};

export default CategoryGrid;  