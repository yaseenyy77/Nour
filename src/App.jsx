import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        {/* الحاوية الرئيسية اللي فيها الـ Snap والـ Scroll */}
        <main 
          id="snap-container" 
          className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white"
        >
          {/* الناف بار لازم يكون هنا عشان يحس بالـ scroll بتاع الـ snap-container */}
          <Navbar /> 

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>

          {/* الفوتر في سكشن لوحده عشان الـ Snap */}
          <section className="bg-[#001b44] snap-start">
            <Footer />
          </section>
        </main>
      </Router>
    </FavoritesProvider>
  );
}

export default App;