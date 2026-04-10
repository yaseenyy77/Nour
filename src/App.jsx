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

// مكون فرعي للتحكم في ظهور الهيدر والفوتر
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  // هنا بنحدد إن لو المسار بيبدأ بـ dashboard مش هنعرض الهيدر والفوتر
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />} 
      {children}
      {!isDashboard && (
        <section className="bg-[#001b44] snap-start">
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
          <main id="snap-container" className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white">
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