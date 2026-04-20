import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// استيراد ستايلات Swiper الأساسية
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// استيراد الصور حسب المسارات الموضحة في مشروعك
import dahabImg from '../../assets/images/دهب.png';
import ghaliImg from '../../assets/images/غالي.png';
import feddaImg from '../../assets/images/فضة.png';

const heroSlides = [
  { id: 1, image: dahabImg },
  { id: 2, image: ghaliImg },
  { id: 3, image: feddaImg }
];

const Hero = () => {
  return (
    /* 1. السيكشن بيبدأ تحت الهيدر بمسافة pt-[90px] لضمان عدم التداخل */
    <section className="w-full bg-white overflow-hidden pt-[90px]">
      
      <div className="relative w-full h-[70vh] md:h-[85vh]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          
          /* 2. خاصية التمرير اللانهائي كما طلبت */
          loop={true} 
          
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                
                {/* 3. الصورة فقط بملء الشاشة (تم مسح المربع الأبيض والنصوص) */}
                <img 
                  src={slide.image} 
                  alt="Jewelry Collection" 
                  className="w-full h-full object-cover"
                />

                {/* طبقة تظليل خفيفة جداً اختيارية للحفاظ على نقاء الصورة */}
                <div className="absolute inset-0 bg-black/[0.02] pointer-events-none"></div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};

export default Hero;