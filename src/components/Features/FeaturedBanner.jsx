import React from 'react';

const FeaturedBanner = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-white overflow-hidden flex items-center">
      {/* الجزء الأيمن: صورة فنية كبيرة */}
      <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">
        <img 
          src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1200" 
          alt="Featured Collection" 
          className="w-full h-full object-cover"
        />
        {/* طبقة سواد خفيفة عشان النص يظهر في الموبايل */}
        <div className="absolute inset-0 bg-black/20 md:bg-transparent md:bg-gradient-to-l md:from-transparent md:to-white"></div>
      </div>

      {/* الجزء الأيسر: النص والمحتوى */}
      <div className="relative z-10 px-6 md:px-16 max-w-2xl">
        <div className="flex flex-col space-y-4">
          <span className="text-[#001b44] font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase">
            Handcrafted Excellence
          </span>
          <h2 className="text-4xl md:text-6xl font-black italic text-[#001b44] leading-tight uppercase tracking-tighter">
            The Royal <br /> Essence
          </h2>
          <p className="text-gray-500 text-xs md:text-sm max-w-md font-medium leading-relaxed uppercase tracking-tighter">
            Discover a collection where every piece tells a story of elegance and timeless gold craftsmanship.
          </p>
          <div className="pt-4">
            <button className="bg-[#001b44] text-[#d4af37] px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-[#001b44] transition-all duration-500 shadow-xl">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* تفصيلة فنية: خط أزرق رفيع في الأسفل */}
      <div className="absolute bottom-0 left-0 w-32 h-[6px] bg-[#001b44]"></div>
    </section>
  );
};

export default FeaturedBanner;