import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';

import Dashboard from './pages/Dashboard/Dashboard'; 
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/UI/ProtectedRoute';

// عملنا مكون جديد يلم الموقع كله عشان نعرف نستخدم useLocation
const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    // هنا السر: الحاوي ده هو الوحيد اللي واخد الشاشة كلها وبيعمل سكرول
    // كدة Navbar هيشوف السكرول ويشغل الأنيميشين، ومفيش دبل سكرول
    <div id="snap-container" className="h-screen overflow-y-auto overflow-x-hidden relative bg-white">
      
      {!isDashboard && <Navbar />} 

      {/* الـ main هنا بياخد مساحته الطبيعية من غير ما يعمل سكرول تاني */}
      <main className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {!isDashboard && (
        <section className="bg-[#001b44]">
          <Footer />
        </section>
      )}
      
    </div>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <AppContent />
      </Router>
    </FavoritesProvider>
  );
}

export default App;