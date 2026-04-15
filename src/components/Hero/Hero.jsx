import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // استيراد Framer Motion للانيميشن

// 1. تعريف متحكمات الانيميشن للعناصر الرئيسية (Stagger Container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // تأخير ظهور كل عنصر عن الذي قبله لبناء قصة بصري
      delayChildren: 0.3, // تأخير بدء الانيميشن الكلي قليلاً
    },
  },
};

// 2. متحكمات الانيميشن للعناصر الفردية (العناوين، النصوص، البطاقات)
const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // البداية: شفاف ومنخفض قليلاً
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 80, damping: 20 } // ظهور ناعم بنوابض
  },
};

// 3. متحكمات لبطاقات المعلومات الجانبية (ظهور من الجنب)
const cardVariantsRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { delay: 1.2, duration: 0.8 } 
  },
};

const cardVariantsLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { delay: 1.4, duration: 0.8 } 
  },
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#000d1a] font-['Montserrat'] antialiased">
      
      {/* ===================== SECTION 1: VISUAL IMMERSION BACKGROUND ===================== */}
      <div className="absolute inset-0 z-0">
        
        {/* أ. صورة خلفية سينمائية Parallax - يجب استبدال الرابط بصورة ذهب عالية الدقة */}
        <motion.img 
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2500&auto=format&fit=crop" // صورة ذهب مصورة باحترافية
          alt="Luxury Gold Jewelry Editorial"
          className="w-full h-full object-cover scale-110" // تكبير قليل لعمل Parallax
          initial={{ scale: 1.2, opacity: 0 }} // البداية: مكبرة وشفافة
          animate={{ scale: 1.1, opacity: 0.35 }} // الحركة: تصغير وبداية الظهور
          transition={{ duration: 2.5, ease: [0.6, 0.01, -0.05, 0.95] }} // انسيابية عالية
        />

        {/* ب. الطبقة المتدرجة الداكنة والبريق الذهبي (كما كانت ولكن أكثر عمقاً) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001b44]/80 via-[#000d1a] to-black opacity-90"></div>
        
        {/* ج. تأثير البريق الخلفي العائم (Floating Gold Dust) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] shadow-[0_0_100px_rgba(212,175,55,0.3)]"></div>
        
        {/* د. تأثير الكشاف العائم (Mouse-follow spotlight) - اختياري، يُفعل عبر الـ JS */}
        {/* <div className="absolute inset-0 pointer-events-none spotlight" style={{background: 'radial-gradient(600px at center, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0) 80%)'}}></div> */}
      </div>

      {/* ===================== SECTION 2: MAIN CONTENT & TEXT STORY ===================== */}
      {/* نستخدم motion.div بدلاً من div ونعطيه المتحكمات */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* أ. شريط Established - انيميشن ظهور من الأعلى */}
        <motion.span 
          variants={itemVariants}
          className="text-[#d4af37] text-[10px] md:text-[12px] font-black uppercase tracking-[0.8em] mb-6 block border-b border-[#d4af37]/20 pb-2 inline-block mx-auto"
        >
          An Legacy of Excellence — Established 2026
        </motion.span>

        {/* ب. العنوان الرئيسي - تقسيم الانيميشن للكلمات لإعطاء فخامة (كما في المواقع الفاخرة) */}
        <motion.h1 
          variants={itemVariants}
          className="text-white text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-10 font-['Playfair_Display']" // تغيير الخط لعناوين فاخرة
        >
          <span className="block overflow-hidden">
            <motion.span initial={{y: 100}} animate={{y: 0}} transition={{delay: 0.6, duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95]}} className="block">
              Pure <span className="text-[#d4af37]">Gold</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden mt-1">
            <motion.span initial={{y: 100}} animate={{y: 0}} transition={{delay: 0.8, duration: 1.2, ease: [0.6, 0.01, -0.05, 0.95]}} className="block">
              Pure <span className="italic font-light text-white/90">Elegance</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* ج. النص التفصيلي - خط Serif كلاسيكي لتأكيد الفخامة */}
        <motion.p 
          variants={itemVariants}
          className="text-gray-300 text-sm md:text-xl max-w-3xl mx-auto mb-16 font-serif leading-relaxed tracking-wide font-light opacity-90"
        >
          Each masterpiece in our collection is meticulously hand-crafted from the world's finest, ethically sourced gold. We combine generational expertise with modern artistry, designed exclusively for those who define luxury in their own terms.
        </motion.p>

        {/* د. زر الشوب المتطور - تفاعل عالي عند الهوفر (Hover Interactions) */}
        <motion.div variants={itemVariants} className="flex items-center justify-center">
          <Link 
            to="/shop" 
            className="group relative bg-[#d4af37] text-[#001b44] px-20 py-6 font-black uppercase text-[12px] tracking-[0.4em] overflow-hidden transition-all duration-500 shadow-[0_0_35px_rgba(212,175,55,0.25)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
          >
            {/* تأثير البريق الداخلي عند الهوفر (Golden Shine Effect) */}
            <span className="absolute inset-0 block bg-white/30 skew-x-[-30deg] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left"></span>
            Shop the Collection
          </Link>
        </motion.div>
      </motion.div>

      {/* ===================== SECTION 3:FLOATING INFO CARDS (الإبداع المضاف) ===================== */}
      {/* بطاقات معلومات شفافة (Glassmorphism) تظهر على الجوانب لتأكيد الجودة والندرة */}
      
      {/* أ. بطاقة يمين - معلومات العيار والحرفة */}
      <motion.div 
        className="absolute top-1/3 right-10 z-20 hidden md:block"
        variants={cardVariantsRight}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#001b44]/20 backdrop-blur-sm border border-white/5 p-6 rounded-sm max-w-[200px] text-left">
          <i className="fas fa-certificate text-[#d4af37] text-2xl mb-4"></i>
          <h4 className="text-white text-sm font-black uppercase tracking-widest mb-2">24K Certified</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed">The purest form of gold, certified for investment and artistry.</p>
        </div>
      </motion.div>

      {/* ب. بطاقة يسار - معلومات الندرة */}
      <motion.div 
        className="absolute bottom-1/3 left-10 z-20 hidden md:block"
        variants={cardVariantsLeft}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-[#001b44]/20 backdrop-blur-sm border border-white/5 p-6 rounded-sm max-w-[200px] text-left">
          <i className="fas fa-palette text-[#d4af37] text-2xl mb-4"></i>
          <h4 className="text-white text-sm font-black uppercase tracking-widest mb-2">Limited Edition</h4>
          <p className="text-gray-400 text-[11px] leading-relaxed">Only a few handcrafted pieces are made per design, ensuring exclusivity.</p>
        </div>
      </motion.div>

      {/* ===================== SECTION 4: SCROLL INDICATOR ===================== */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-[1px] h-20 bg-gradient-to-b from-[#d4af37] to-transparent"></div>
        {/* إضافة نص صغير فوق خط السكرول */}
        <span className="text-[#d4af37] text-[8px] tracking-[0.4em] uppercase opacity-60">Scroll to Explore</span>
      </div>

    </section>
  );
};

export default Hero;