import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import HeroSlider from './components/Hero/HeroSlider';
import HeroContent from './components/Hero/HeroContent';
import ProductShowcase from './components/Products/ProductShowcase';
import Footer from './components/Footer/Footer';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const Home = () => {
  return (
    <main 
      id="snap-container" 
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth relative bg-white selection:bg-[#d4af37] selection:text-white"
    >
      {/* 1. سيكشن الهيرو */}
      <section id="home" className="relative h-screen w-full flex items-center snap-start overflow-hidden bg-[#001b44]">
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        <div className="relative z-20 w-full">
          <HeroContent />
        </div>
      </section>

      {/* 2. منطقة السلايدرات مع تظبيط السناب */}
      <div className="flex flex-col bg-white">
        
        {/* السلايدر الأول: ضفنا scroll-mt-20 عشان السناب يقف قبل العنوان بمسافة */}
        <section className="snap-start scroll-mt-20 pt-10">
          <ProductShowcase title="gold bullions" />
        </section>

        {/* السلايدر الثاني: نفس الكلام عشان الكلام ميبقاش مقطوع */}
        <section className="snap-start scroll-mt-20 pt-10">
          <ProductShowcase title="fine jewelry" />
        </section>
        
      </div>

      {/* 3. سيكشن الفوتر */}
      <section className="relative h-screen w-full snap-start bg-[#001b44] flex items-end">
        <Footer />
      </section>
    </main>
  );
};

function App() {
  return (
    <Router>
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