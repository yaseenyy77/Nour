import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const NavLinks = ({ isScrolled, mobile, closeMenu }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const links = [
    { title: 'Home', href: '#' },
    { title: 'About', subLinks: ['Our Story', 'Craftsmanship', 'Locations'] },
    { title: 'Shop Now', subLinks: ['Rings', 'Necklaces', 'Bullion'] },
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
            <a 
              href={link.href} 
              className={`${isScrolled || mobile ? 'text-white' : 'text-white/90'} font-serif tracking-widest uppercase text-sm hover:text-[#d4af37] transition-colors`}
            >
              {link.title}
            </a>
            {link.subLinks && mobile && (
              <ChevronDown size={18} className={`text-[#d4af37] transition-transform ${activeDropdown === index ? 'rotate-180' : ''}`} />
            )}
          </div>

          {/* القائمة المنسدلة في الموبايل */}
          {link.subLinks && mobile && activeDropdown === index && (
            <ul className="mt-4 flex flex-col gap-3 pl-4 border-l border-[#d4af37]/30">
              {link.subLinks.map((sub, i) => (
                <li key={i} className="text-white/70 text-sm hover:text-[#d4af37]" onClick={closeMenu}>
                  {sub}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;