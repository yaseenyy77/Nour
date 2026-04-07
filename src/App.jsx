import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// استيراد المكونات من مساراتها الصحيحة بناءً على الفيديو
import Navbar from './components/Header/Navbar';
import HeroSlider from './components/Hero/HeroSlider';
import HeroContent from './components/Hero/HeroContent';
import HeroCategories from './components/Hero/HeroCategories';
import GoldBarSlider from './components/Sliders/GoldBarSlider';
import Footer from './components/Footer/Footer'; // استيراد الفوتر المجمع
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * @component Home
 * يمثل الصفحة الرئيسية بترتيبها الصحيح: الهيرو، ثم الأقسام، ثم السبائك، وفي النهاية الفوتر
 */
const Home = () => {
  return (
    <main 
      id="snap-container" 
      className="h-screen overflow-y-scroll md:snap-y md:snap-mandatory scroll-smooth relative bg-white selection:bg-[#d4af37] selection:text-white"
    >
      {/* 1. سيكشن الهيرو (الخلفية واللوجو) */}
      <section id="home" className="relative h-screen w-full flex items-center md:snap-start overflow-hidden">
        <div className="hidden md:block absolute inset-0">
          <HeroSlider />
        </div>
        <div className="md:hidden absolute inset-0 bg-[#001b44]"></div>
        <div className="relative z-20 w-full">
          <HeroContent />
        </div>
      </section>

      {/* 2. سيكشن المتجر (الكاتيجوري والسلايدر) */}
      <section id="shop" className="relative h-auto min-h-screen w-full flex flex-col md:snap-start bg-white z-10 py-20 border-b border-gray-50">
        <div className="max-[1400px] mx-auto w-full flex flex-col gap-24">
            {/* الأقسام (Rings, Bracelets...) */}
            <div className="px-6 md:px-16">
                <div className="mb-12 text-center">
                  <h2 className="text-[#001b44] text-3xl md:text-5xl font-serif italic uppercase tracking-tighter">Shop By Category</h2>
                  <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-4"></div>
                </div>
                <HeroCategories />
            </div>

            {/* سلايدر السبائك الجديد */}
            <div className="w-full">
              <div className="mb-12 text-center">
                <span className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase">Exquisite Collection</span>
                <h3 className="text-[#001b44] text-2xl md:text-4xl font-serif italic mt-2">Pure Gold Bullion</h3>
              </div>
              <GoldBarSlider />
            </div>
        </div>
      </section>

      {/* 3. سيكشن الفوتر - يظهر في نهاية التمرير */}
      <section className="md:snap-start bg-[#001b44]">
        <Footer />
      </section>
    </main>
  );
};

function App() {
  return (
    <Router>
      {/* النافبار ثابت فوق كل الصفحات */}
      <Navbar /> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;