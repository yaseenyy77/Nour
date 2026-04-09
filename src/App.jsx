import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';

// استيراد الصفحات الجديدة التي تظهر في مجلد pages عندك
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        {/* الحاوية الرئيسية التي تدعم الـ Snap Scrolling */}
        <main 
          id="snap-container" 
          className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white"
        >
          {/* الناف بار ثابت ويحس بحركة الـ scroll */}
          <Navbar /> 

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            
            {/* مسارات لوحة التحكم والأدمن */}
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/admin-login" element={<AdminLogin />} />
          </Routes>

          {/* الفوتر في سكشن منفصل للـ Snap */}
          <section className="bg-[#001b44] snap-start">
            <Footer />
          </section>
        </main>
      </Router>
    </FavoritesProvider>
  );
}

export default App;