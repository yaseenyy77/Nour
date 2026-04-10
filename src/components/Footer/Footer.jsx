import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#001b44] text-white py-16 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* شبكة بـ 3 أعمدة فقط لتصميم أنيق وبسيط */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* العمود 1: هوية البراند والسوشيال ميديا */}
          <div className="space-y-8">
            <h2 className="text-3xl font-black italic text-[#d4af37] tracking-tighter">
              NOUR GOLD
            </h2>
            <p className="text-gray-400 text-[10px] leading-relaxed max-w-xs uppercase tracking-[0.2em]">
              الوجهة الأولى للاستثمار في الذهب الخالص بلمسة ملكية فريدة. نجمع بين عراقة الماضي وفخامة الحاضر.
            </p>
            <div className="flex gap-5">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-500 hover:text-[#d4af37] transition-all duration-500 transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* العمود 2: روابط سريعة - متموضعة في المنتصف */}
          <div className="md:justify-self-center">
            <h4 className="text-[#d4af37] font-bold uppercase tracking-[0.4em] text-[10px] mb-10">Quick Links</h4>
            <ul className="space-y-5 text-[11px] font-bold tracking-[0.2em] uppercase">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</a></li>
              <li><a href="/investment" className="text-gray-400 hover:text-white transition-colors">Investment</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* العمود 3: الدعم - متموضعة في اليمين */}
          <div className="md:justify-self-end">
            <h4 className="text-[#d4af37] font-bold uppercase tracking-[0.4em] text-[10px] mb-10">Support</h4>
            <ul className="space-y-5 text-[11px] font-bold tracking-[0.2em] uppercase">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;