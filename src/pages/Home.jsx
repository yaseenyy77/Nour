import React from 'react';
import Hero from '../components/Hero/Hero'; 
import ProductShowcase from '../components/Products/ProductShowcase';

const Home = () => {
  // قائمة البراندات الـ 10 المطلوبة
  const brands = [
    "L'azurde", "Egypt Gold", "Jawhara", "Iram", "Selema Gold", 
    "Kirmena", "Damas", "Siran", "Glamour", "King gold"
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <section id="home" className="relative">
        <Hero />
      </section> 
      
      <div className="flex flex-col py-4 md:py-8 gap-y-12">
        {brands.map((brand) => (
          <section key={brand} id={brand.replace(/\s+/g, '-').toLowerCase()} className="scroll-mt-24">
            <ProductShowcase 
              title={brand} 
              category={brand} // بنمرر اسم البراند هنا كـ category
            />
          </section>
        ))}
      </div>

      <style jsx>{`
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