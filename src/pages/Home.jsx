import React from 'react';
// استدعاء الهيرو الجديد
import Hero from '../components/Hero/Hero'; 
import ProductShowcase from '../components/Products/ProductShowcase';

/**
 * مكون الصفحة الرئيسية لمشروع "Nour"
 * تم تحديثه لاستخدام الهيرو السينمائي الجديد بدون سلايدر
 */
const Home = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. قسم الهيرو (Hero Section) الجديد */}
      <section 
        id="home" 
        className="snap-start snap-always"
      >
        <Hero />
      </section>

      {/* 2. منطقة عرض المنتجات (Product Collections) */}
      <div className="flex flex-col py-4 md:py-8">
        
        {/* قسم الخواتم - Rings */}
        <section id="rings" className="snap-start snap-always scroll-mt-20">
          <ProductShowcase 
            title="Elegant Rings" 
            category="rings" 
          />
        </section>

        {/* قسم السلاسل - Necklaces */}
        <section id="necklaces" className="scroll-mt-20">
          <ProductShowcase 
            title="Fine Necklaces" 
            category="necklaces" 
          />
        </section>

        {/* قسم الحلقان - Earrings */}
        <section id="earrings" className="scroll-mt-20">
          <ProductShowcase 
            title="Luxe Earrings" 
            category="earrings" 
          />
        </section>

        {/* قسم الأساور - Bracelets */}
        <section id="bracelets" className="scroll-mt-20">
          <ProductShowcase 
            title="Royal Bracelets" 
            category="bracelets" 
          />
        </section>

      </div>
    </div>
  );
};

export default Home;