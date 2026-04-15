import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CategoryGrid - Minimalist White Luxury
 * فكرة هادئة تعتمد على المساحات البيضاء والتحريك الناعم
 */
const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      title: "Gold Rings",
      subtitle: "The Essence of Purity",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000",
      link: "/shop?category=rings"
    },
    {
      id: 2,
      title: "Luxury Necklaces",
      subtitle: "Fluid Elegance",
      image: "https://images.unsplash.com/photo-1599643478518-a744c517b243?q=80&w=1000",
      link: "/shop?category=necklaces"
    },
    {
      id: 3,
      title: "Royal Bracelets",
      subtitle: "Timeless Strength",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
      link: "/shop?category=bracelets"
    },
    {
      id: 4,
      title: "Elegant Earrings",
      subtitle: "Subtle Radiance",
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1000",
      link: "/shop?category=earrings"
    }
  ];

  return (
    <section className="bg-white py-24 px-6 md:px-16 overflow-hidden">
      {/* عنوان هادئ وبسيط */}
      <div className="max-w-screen-xl mx-auto mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#d4af37] text-[10px] font-bold uppercase tracking-[0.5em] block mb-4"
        >
          Curated Collection
        </motion.span>
        {/* تصحيح الخطأ هنا: الفتح والإغلاق متطابقان */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-serif italic text-slate-900"
        >
          Simple <span className="font-light not-italic text-slate-400">Masterpieces</span>
        </motion.h2>
      </div>

      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group"
          >
            {/* حاوية الصورة مع Mask ناعم */}
            <Link to={cat.link} className="relative block aspect-[3/4] overflow-hidden bg-[#fcfcfc] mb-6">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </Link>

            {/* تفاصيل القسم بنظام Minimal */}
            <div className="text-left space-y-2">
              <p className="text-[9px] text-gray-400 uppercase tracking-widest">{cat.subtitle}</p>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {cat.title}
              </h3>
              <Link 
                to={cat.link}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-2 group-hover:text-[#d4af37] transition-colors"
              >
                View Collection <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;