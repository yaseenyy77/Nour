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
      {/* الناف بار هيفضل موجود وبياخد الـ scroll من الصفحة كلها */}
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
          {/* شلنا h-screen و overflow-y-scroll عشان نلغي السكرول المزدوج */}
          {/* سيبنا الـ id لو الأنيميشين بتاعك بيعتمد عليه كـ Reference */}
          <main id="snap-container" className="relative bg-white min-h-screen">
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