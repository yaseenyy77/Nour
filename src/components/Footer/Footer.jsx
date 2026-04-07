import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-[#001b44] text-white pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* الجزء العلوي - توزيع 4 أعمدة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* العمود 1: البراند والوصف */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black italic text-[#d4af37] tracking-tighter">
              NOUR GOLD
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              الوجهة الأولى للاستثمار في الذهب الخالص بلمسة ملكية فريدة. نجمع بين عراقة الماضي وفخامة الحاضر.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter].map((Icon, index) => (
                <a key={index} href="#" className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="/investment" className="hover:text-white transition-colors">Investment</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* العمود 3: الدعم */}
          <div>
            <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* العمود 4: النشرة البريدية */}
          <div>
            <h4 className="text-[#d4af37] font-bold uppercase tracking-widest text-xs mb-8">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-6">اشترك للحصول على تحديثات أسعار الذهب الحصرية</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent border-b border-white/20 py-2 text-xs focus:border-[#d4af37] outline-none transition-all"
              />
              <button className="absolute right-0 bottom-2 text-[10px] font-bold text-[#d4af37] hover:text-white transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* الجزء السفلي - الحقوق ووسائل الدفع */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-[10px] text-gray-500 tracking-widest">
            © 2026 NOUR GOLD. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 opacity-50">
            <img src="/images/visa.png" alt="Visa" className="h-4" />
            <img src="/images/mastercard.png" alt="Mastercard" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;