import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';

// الاستيراد بالمسار الجديد الصحيح
import Dashboard from './pages/Dashboard/Dashboard'; 
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/UI/ProtectedRoute';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <main id="snap-container" className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white">
          <Navbar /> 
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
          <section className="bg-[#001b44] snap-start">
            <Footer />
          </section>
        </main>
      </Router>
    </FavoritesProvider>
  );
}

export default App;