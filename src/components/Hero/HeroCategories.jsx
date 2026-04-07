import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const HeroCategories = () => {
  const [dbMessages, setDbMessages] = useState([]);

  // كود سحب البيانات من Supabase
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .order('created_at', { ascending: false }); // يجيب الأجدد فوق
      
      if (data) setDbMessages(data);
    };

    fetchMessages();
  }, []);

  const categories = [
    { id: 1, name: "Rings", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600", href: "#rings" },
    { id: 2, name: "Bracelets", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600", href: "#bracelets" },
    { id: 3, name: "Necklaces", img: "https://images.unsplash.com/photo-1618390885230-08c3539f99ed?q=80&w=600", href: "#necklaces" },
    { id: 4, name: "Bullion", img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=600", href: "#bullion" },
  ];

  return (
    <div className="w-full">
      {/* عرض رسائل التجربة من الداتابيز */}
      <div className="mb-12 flex flex-wrap justify-center gap-2">
        {dbMessages.map((msg, index) => (
          <span key={index} className="bg-[#d4af37]/10 text-[#d4af37] px-4 py-1 rounded-full border border-[#d4af37]/20 text-sm italic">
            {msg.name}
          </span>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-[#001b44] text-3xl font-serif italic tracking-wider text-center">Shop by Category</h2>
        <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-4 opacity-60"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {categories.map((cat) => (
          <a key={cat.id} href={cat.href} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-xl border border-gray-100">
            <img 
              src={cat.img} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Jewellery'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-4 md:p-6">
              <h3 className="text-[#d4af37] text-xl md:text-2xl font-serif italic mb-1">{cat.name}</h3>
              <span className="text-white/80 text-[10px] md:text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                View Details
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default HeroCategories;