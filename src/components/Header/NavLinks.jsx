import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { ChevronDown } from 'lucide-react';

const NavLinks = ({ isScrolled, mobile, closeMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const links = [
    { title: 'Home', href: '/' },
    { title: 'About', subLinks: ['Our Story', 'Craftsmanship', 'Locations'] },
    { title: 'Shop Now', href: '/shop' },
    { title: 'Contact', href: '#' },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <ul className={`flex ${mobile ? 'flex-col w-full' : 'items-center gap-8'}`}>
      {links.map((link, index) => (
        <li key={index} className={`relative ${mobile ? 'border-b border-[#d4af37]/10 py-4' : ''}`}>
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => mobile && link.subLinks ? toggleDropdown(index) : null}
          >
            {/* تم تغيير اللون هنا للأسود الصريح text-black */}
            <Link 
              to={link.href} 
              onClick={closeMenu}
              className="text-black font-serif tracking-[0.3em] uppercase text-[13px] font-bold hover:text-[#d4af37] transition-colors"
            >
              {link.title}
            </Link>
            
            {link.subLinks && mobile && (
              <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
            )}
          </div>
          {/* باقي كود الـ SubLinks يفضل كما هو */}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;