import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop'; // استيراد صفحة الشوب الجديدة

function App() {
  return (
    <Router>
      <main 
        id="snap-container" 
        className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white"
      >
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} /> {/* إضافة المسار الجديد */}
        </Routes>

        <section className="bg-[#001b44]">
          <Footer />
        </section>
      </main>
    </Router>
  );
}

export default App;