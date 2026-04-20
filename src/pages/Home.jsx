import React from 'react';
import Hero from '../components/Hero/Hero'; 
import ProductShowcase from '../components/Products/ProductShowcase';

const Home = () => {
  // قائمة البراندات المحددة للمعرض الرقمي
  const brands = [
    "L'azurde", 
    "Egypt Gold", 
    "Jawhara", 
    "Iram", 
    "Selema Gold", 
    "Kirmena", 
    "Damas", 
    "Siran", 
    "Glamour", 
    "King gold"
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      
      {/* قسم الهيرو الرئيسي */}
      <section id="home" className="relative">
        <Hero />
      </section> 
      
      {/* عرض مجموعات البراندات */}
      <div className="flex flex-col py-6 md:py-12 gap-y-8">
        {brands.map((brandName) => (
          <section 
            key={brandName} 
            id={brandName.replace(/\s+/g, '-').toLowerCase()} 
            className="scroll-mt-24"
          >
            <ProductShowcase 
              title={brandName} 
              brand={brandName} 
            />
          </section>
        ))}
      </div>

      <style jsx>{`
        /* أنيميشن الظهور التدريجي للمحتوى لتعزيز اللمسة السينمائية */
        .flex-col > section {
          animation: fadeInContent 1s ease-out forwards;
        }

        @keyframes fadeInContent {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;