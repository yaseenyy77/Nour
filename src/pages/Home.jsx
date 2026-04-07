import React from 'react';
import HeroSlider from '../components/Hero/HeroSlider';
import HeroContent from '../components/Hero/HeroContent';
import ProductShowcase from '../components/Products/ProductShowcase';

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* سيكشن الهيرو: واخد snap-start عشان يثبت في أول دخلة الموقع */}
      <section 
        id="home" 
        className="relative h-screen w-full flex items-center snap-start snap-always overflow-hidden bg-[#001b44]"
      >
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        <div className="relative z-20 w-full px-4 md:px-16">
          <HeroContent />
        </div>
      </section>

      {/* سلايدر السبائك: واخد snap-start عشان لما اليوزر ينزل أول مرة، الشاشة تقف عنده مسطرة */}
      <section className="snap-start snap-always scroll-mt-16 md:scroll-mt-20">
        <ProductShowcase 
          title="Gold Bullions" 
          category="bullions" 
        />
      </section>

      {/* سلايدر المجوهرات: شلنا منه snap-start. 
         دلوقت المستخدم يقدر يقلب فيه براحته ويوقف السكرول في أي مكان 
         وده بيحل مشكلة "الفراغ" اللي كانت بتظهر في الآخر.
      */}
      <section className="scroll-mt-16 md:scroll-mt-20">
        <ProductShowcase 
          title="Fine Jewelry" 
          category="jewelry" 
        />
      </section>
      
      {/* أي سيكشن هتضيفه هنا تحت هيكون سكرول طبيعي جداً */}
    </div>
  );
};

export default Home;