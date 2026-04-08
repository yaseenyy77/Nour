import React from 'react';
import HeroSlider from '../components/Hero/HeroSlider';
import HeroContent from '../components/Hero/HeroContent';
import ProductShowcase from '../components/Products/ProductShowcase';

/**
 * مكون الصفحة الرئيسية لمشروع "Nour"
 * تم تحديثه ليشمل الأقسام الأربعة المتخصصة للمجوهرات
 * مع تحسين المسافات (Spacings) لتصغير حجم السلايدرز
 */
const Home = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. قسم الهيرو (Hero Section) 
          يستخدم الـ snap-start لضمان وقوف الشاشة في بداية الموقع بدقة.
      */}
      <section 
        id="home" 
        className="relative h-screen w-full flex items-center snap-start snap-always overflow-hidden bg-[#001b44]"
      >
        {/* السلايدر الخلفي (يختفي في الموبايل ويظهر في الـ Desktop) */}
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        
        {/* المحتوى الأمامي (لوجو اللوتس والنص الترحيبي) */}
        <div className="relative z-20 w-full px-4 md:px-16">
          <HeroContent />
        </div>
      </section>

      {/* 2. منطقة عرض المنتجات (Product Collections)
          تم تصغير الـ padding الرأسي (py-4) لتقليل المساحات الفارغة.
      */}
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

      {/* ملاحظات تقنية للتعديلات القادمة:
          - تم تفعيل الـ Snap فقط في أول سكشنين لضمان تجربة مستخدم سلسة.
          - الـ IDs (rings, necklaces...) تستخدم للربط مع الـ Navbar.
          - التأكد من مطابقة الـ category مع ملف productsData.js لضمان ظهور الصور.
      */}
      
      {/* سكشن إضافي اختياري (يمكن تفعيله لاحقاً للسبائك) */}
      {/* <section className="bg-gray-50/50">
        <ProductShowcase title="Gold Bullions" category="bullions" />
      </section> 
      */}

    </div>
  );
};

export default Home;