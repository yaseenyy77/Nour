import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // إضافة دي

import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard/Dashboard'; 
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/UI/ProtectedRoute';

const queryClient = new QueryClient(); // إضافة دي

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div id="snap-container" className="h-screen overflow-y-auto overflow-x-hidden relative bg-white">
      {!isDashboard && <Navbar />} 
      <main className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isDashboard && <section className="bg-[#001b44]"><Footer /></section>}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* تغليف الموقع هنا */}
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </QueryClientProvider>
  );
}

export default App;