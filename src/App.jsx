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

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />} 
      {children}
      {!isDashboard && (
        <section className="bg-[#001b44]">
          <Footer />
        </section>
      )}
    </>
  );
};

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <LayoutWrapper>
          {/* رجعنا الـ id والـ h-screen عشان الأنيميشين يشتغل، بس شلنا الـ snap scroll عشان نصلح الـ Double Scroll */}
          <main id="snap-container" className="h-screen overflow-y-auto relative bg-white border-none outline-none">
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
        </LayoutWrapper>
      </Router>
    </FavoritesProvider>
  );
}

export default App;