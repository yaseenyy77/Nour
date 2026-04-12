import React from 'react';
import FooterLinks from './FooterLinks';
import SocialMedia from './SocialMedia';

const Footer = () => {
  return (
    <footer className="w-full bg-[#001b44] text-white py-10 md:py-20 px-6 md:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* تقسيم الشبكة لـ 4 أعمدة في الكمبيوتر لملء الفراغ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 items-start text-center md:text-left">
          
          {/* العمود 1: البراند (أخذ مساحة أكبر قليلاً) */}
          <div className="space-y-6 md:col-span-1">
            <h2 className="text-2xl md:text-3xl font-black italic text-[#d4af37] tracking-tighter">
              NOUR GOLD
            </h2>
            <p className="text-gray-400 text-[9px] md:text-[11px] leading-relaxed uppercase tracking-[0.15em] mx-auto md:mx-0 max-w-[200px] md:max-w-full">
              الوجهة الأولى للاستثمار في الذهب الخالص بلمسة ملكية فريدة.
            </p>
          </div>

          {/* العمود 2 و 3: الروابط (FooterLinks) */}
          {/* ملاحظة: المكون سيعرض مجموعتين من الروابط تلقائياً */}
          <FooterLinks />

          {/* العمود 4: استغلال المساحة لأزرار الميديا بشكل "شيك" ومنفصل */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <h4 className="text-[#d4af37] font-bold uppercase tracking-[0.3em] text-[10px]">Follow Us</h4>
            <SocialMedia />
            <div className="hidden md:block mt-4">
               <p className="text-gray-600 text-[9px] uppercase tracking-widest leading-loose text-right">
                 Luxury Investment <br/> Since 1995
               </p>
            </div>
          </div>

        </div>

        {/* الجزء السفلي */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[8px] md:text-[9px] uppercase tracking-[0.2em]">
            © 2024 NOUR GOLD. Crafted for Excellence.
          </p>
          <div className="flex gap-6 text-gray-500 text-[8px] uppercase tracking-widest">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;