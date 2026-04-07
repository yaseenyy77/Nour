import React from 'react';
import Newsletter from './Newsletter';
import FooterLinks from './FooterLinks';
import SocialMedia from './SocialMedia';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className="bg-[#001b44] pt-24 pb-12 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* لوجو ووصف */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[#d4af37] text-3xl font-serif italic font-black tracking-tighter">NOUR GOLD</h2>
            <p className="text-gray-400 text-xs font-medium leading-loose uppercase tracking-[0.1em]">
              الوجهة الأولى للاستثمار في الذهب الخالص بلمسة ملكية فريدة.
            </p>
            <SocialMedia />
          </div>

          {/* لينكات الفوتر المقسمة */}
          <FooterLinks />

          {/* الاشتراك البريدي */}
          <Newsletter />
        </div>

        {/* خط الفصل */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"></div>
        
        {/* الحقوق */}
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;