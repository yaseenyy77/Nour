import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// استيراد الستايلات الأساسية
import 'swiper/css';
import 'swiper/css/free-mode';

const GoldBarSlider = () => {
  // البيانات بالتفصيل وبدون أسعار لضمان الفخامة
  const goldProducts = [
    { 
      id: 1, 
      name: "سبيكة ذهب سليمي فاخرة", 
      weight: "100 جرام", 
      caliber: "عيار 24", 
      company: "SELEMA GOLD", 
      img: "https://selimagold.com/cdn/shop/files/100G.png" 
    },
    { 
      id: 2, 
      name: "عملة الملك جورج الخامس", 
      weight: "8 جرام", 
      caliber: "عيار 22", 
      company: "BTC Egypt", 
      img: "https://selimagold.com/cdn/shop/products/George-V-half-pound_f329bb6d.png" 
    },
    { 
      id: 3, 
      name: "سبيكة ذهب سليمي", 
      weight: "50 جرام", 
      caliber: "عيار 24", 
      company: "SELEMA GOLD", 
      img: "https://selimagold.com/cdn/shop/files/50G.png" 
    },
    { 
      id: 4, 
      name: "جنيه ذهب ملكي إصدار خاص", 
      weight: "8 جرام", 
      caliber: "عيار 21", 
      company: "Nour Gold", 
      img: "https://selimagold.com/cdn/shop/files/1_d2f3b9be.png" 
    },
    { 
      id: 5, 
      name: "سبيكة ذهب سليمي مصغرة", 
      weight: "10 جرام", 
      caliber: "عيار 24", 
      company: "SELEMA GOLD", 
      img: "https://selimagold.com/cdn/shop/files/10G.png" 
    },
    { 
      id: 6, 
      name: "نصف جنيه ذهب جورج", 
      weight: "4 جرام", 
      caliber: "عيار 22", 
      company: "BTC Egypt", 
      img: "https://selimagold.com/cdn/shop/products/George-V-half-pound_f329bb6d.png" 
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden relative selection:bg-[#d4af37] selection:text-white">
      
      {/* هيدر القسم - زرار الديسكوفر قريب من العنوان */}
      <div className="max-w-[1300px] mx-auto px-6 mb-8 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 border-b border-[#d4af37]/10 pb-6">
          <div className="text-center md:text-left">
            <h2 className="text-[#001b44] text-3xl md:text-4xl font-serif italic tracking-tighter uppercase font-black">
              Gold Investment
            </h2>
            <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mt-1">
              أفضل خيارات الاستثمار في الذهب
            </p>
          </div>
          
          <button className="group/disc flex items-center gap-2 text-[#001b44] font-black text-[11px] tracking-widest uppercase transition-all hover:text-[#d4af37]">
            <span>Discover All</span>
            <div className="w-7 h-7 rounded-full border border-[#d4af37]/40 flex items-center justify-center group-hover/disc:bg-[#d4af37] transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover/disc:text-white">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* السلايدر - تعديلات الماوس والسلاسة */}
      <div className="relative px-2 md:px-4 cursor-default">
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={25}
          slidesPerView={1.3}
          loop={true}
          speed={11000} // سرعة انسيابية تمنع التقطيع
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.6,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false, // مبيوقفش لما تلمسه
          }}
          breakpoints={{
            480: { slidesPerView: 2.2, spaceBetween: 20 },
            768: { slidesPerView: 3.2, spaceBetween: 30 },
            1024: { slidesPerView: 4.2, spaceBetween: 35 },
            1440: { slidesPerView: 5.2, spaceBetween: 40 },
          }}
          className="continuous-slider-pro !cursor-default active:!cursor-grabbing"
        >
          {goldProducts.map((product) => (
            <SwiperSlide key={product.id} className="py-6 !cursor-default">
              <div className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-6 transition-all duration-700 hover:shadow-[0_25px_50px_rgba(212,175,55,0.12)] hover:-translate-y-2 hover:border-[#d4af37]/20 !cursor-pointer">
                
                {/* خلفية جمالية تظهر عند الهوفر */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]"></div>

                {/* صورة المنتج - ظهور كامل للمنتج */}
                <div className="aspect-square mb-8 overflow-hidden rounded-[2rem] bg-[#fcfcfc] flex items-center justify-center p-8 relative z-10 border border-gray-50 shadow-inner">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="max-h-full max-w-full object-contain transition-transform duration-1000 group-hover:scale-105" 
                  />
                </div>

                {/* المحتوى */}
                <div className="text-center relative z-10">
                  <h3 className="text-[#001b44] font-black text-sm mb-2 uppercase tracking-tight line-clamp-1">{product.name}</h3>
                  <div className="inline-block px-3 py-1 bg-[#d4af37]/5 rounded-full mb-8">
                    <span className="text-[#d4af37] font-extrabold text-[11px] tracking-widest lowercase">{product.weight} • {product.caliber}</span>
                  </div>
                  
                  <button className="w-full bg-[#001b44] text-[#d4af37] py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-[#d4af37] hover:text-white uppercase shadow-lg">
                    Add to Treasury
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        /* ثبات الحركة بدون تقطيع */
        .continuous-slider-pro .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        /* ضبط شكل الماوس */
        .continuous-slider-pro {
          cursor: default !important;
        }
        
        .continuous-slider-pro.swiper-free-mode {
          cursor: default !important;
        }

        .continuous-slider-pro:active {
          cursor: grabbing !important;
        }

        .continuous-slider-pro .group {
          cursor: pointer !important;
        }
      `}</style>
    </section>
  );
};

export default GoldBarSlider;