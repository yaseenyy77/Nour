import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] uppercase">Newsletter</h3>
      <p className="text-gray-400 text-[11px] leading-relaxed uppercase tracking-widest">
        اشترك للحصول على تحديثات أسعار الذهب الحصرية
      </p>
      <div className="relative group max-w-sm">
        <input 
          type="email" 
          placeholder="ENTER YOUR EMAIL" 
          className="w-full bg-transparent border-b border-white/20 py-3 text-[10px] text-white tracking-[0.2em] outline-none focus:border-[#d4af37] transition-colors placeholder:text-gray-600"
        />
        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4af37] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;