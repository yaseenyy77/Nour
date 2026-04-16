import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import Logo from './Logo';
import NavLinks from './NavLinks';
import Actions from './Actions';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

  useEffect(() => {
    const snapContainer = document.getElementById('snap-container');
    
    const handleScroll = () => {
      const currentScrollY = snapContainer ? snapContainer.scrollTop : 0;

      // تغيير خلفية الناف بار
      if (currentScrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);

      // منطق الإخفاء والإظهار (فقط في صفحة الشوب)
      if (isShopPage) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false); // نازل لتحت -> اخفي
        } else {
          setIsVisible(true); // طالع لفوق -> اظهر
        }
      } else {
        setIsVisible(true); // في باقي الصفحات دايماً ظاهر
      }

      lastScrollY.current = currentScrollY;
    };

    if (snapContainer) snapContainer.addEventListener('scroll', handleScroll);
    return () => snapContainer?.removeEventListener('scroll', handleScroll);
  }, [isShopPage]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 px-6 md:px-20 ${
          isScrolled ? 'bg-[#001b44]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-[#001b4400] py-6'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => setIsOpen(true)} className="lg:hidden text-[#d4af37] p-2">
            <Menu size={28} />
          </button>

          <Logo isScrolled={true} />

          <div className="hidden lg:block">
            <NavLinks isScrolled={true} />
          </div>

          <Actions isScrolled={true} />
        </div>
      </nav>

      {/* Sidebar للموبايل */}
      <div className={`fixed inset-0 z-[10000] bg-[#001b44] transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <Logo isScrolled={true} />
            <button onClick={() => setIsOpen(false)} className="text-[#d4af37] p-2 border border-[#d4af37]/20 rounded-full">
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col">
             <NavLinks isScrolled={true} mobile={true} closeMenu={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;