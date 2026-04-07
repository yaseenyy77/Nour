import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      {/* شيلنا snap-mandatory عشان السكرول ميبقاش "إجباري" في كل حتة.
         خليناها snap-y بس عشان السكاشن اللي احنا محددينها فوق بس هي اللي تلقط.
      */}
      <main 
        id="snap-container" 
        className="h-screen overflow-y-scroll snap-y scroll-smooth relative bg-white"
      >
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          {/* هنا تقدر تضيف أي Route جديد مستقبلاً */}
        </Routes>

        {/* الفوتر دلوقت بقى سكرول عادي (من غير snap-start) عشان يفرش براحته */}
        <section className="bg-[#001b44]">
          <Footer />
        </section>
      </main>
    </Router>
  );
}

export default App;