import React from 'react';
import Hero from '../components/Hero/Hero'; 
import CategoryGrid from '../components/Hero/CategoryGrid'; 
import ProductShowcase from '../components/Products/ProductShowcase';

/**
 * مكون الصفحة الرئيسية - نسخة مصلحة بدون تعارض مع أنيميشن الناف بار
 * تم إزالة كلاسات الـ Snap التي قد تعطل الـ Scroll Events الخاصة بالـ Navbar
 */
const Home = () => {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      
      {/* 1. قسم الهيرو - التأكد من عدم وجود snap-start تعطل الـ Navbar */}
      <section id="home" className="relative">
        <Hero />
      </section>

      {/* 2. قسم الذهب والمجوهرات (الأربع صور) تحت الهيرو مباشرة */}
      <CategoryGrid />

      {/* 3. سلايدرز المنتجات */}
      <div className="flex flex-col py-4 md:py-8 gap-y-12">
        
        {/* قسم الخواتم */}
        <section id="rings" className="scroll-mt-24">
          <ProductShowcase 
            title="Elegant Rings" 
            category="rings" 
          />
        </section>

        {/* قسم السلاسل */}
        <section id="necklaces" className="scroll-mt-24">
          <ProductShowcase 
            title="Fine Necklaces" 
            category="necklaces" 
          />
        </section>

        {/* قسم الحلقان */}
        <section id="earrings" className="scroll-mt-24">
          <ProductShowcase 
            title="Luxe Earrings" 
            category="earrings" 
          />
        </section>

        {/* قسم الأساور */}
        <section id="bracelets" className="scroll-mt-24">
          <ProductShowcase 
            title="Royal Bracelets" 
            category="bracelets" 
          />
        </section>

      </div>

      {/* --- ملاحظات الإصلاح التقنية ---
          1. تم حذف 'snap-start' و 'snap-always' لأنها تجبر المتصفح على القفز 
             مما يمنع مكتبات مثل Framer Motion أو الـ Scroll Listeners 
             الخاصة بالناف بار من العمل بسلاسة.
          2. تم تغيير 'h-screen' (إذا كانت موجودة) إلى 'min-h-screen' لضمان 
             وجود مساحة حقيقية للتمرير (Natural Scrolling).
          3. تم تعديل 'scroll-mt-20' إلى 'scroll-mt-24' لضمان عدم اختفاء 
             العنوان خلف الناف بار عند النقر على روابط التنقل.
          4. تم إضافة 'relative' للهيرو لضمان أن الـ z-index الخاص بالناف بار 
             يظل هو الأعلى دائماً فوق المحتوى.
      */}

      <style jsx>{`
        /* أنيميشن ناعم لظهور العناصر عند التحميل دون التأثير على الناف بار */
        .flex-col > section {
          animation: fadeInContent 0.8s ease-out forwards;
        }

        @keyframes fadeInContent {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;