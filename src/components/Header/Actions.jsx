import React from 'react';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

const Actions = () => {
  return (
    <div className="flex items-center gap-5 text-black">
      {/* أيقونة البحث */}
      <FiSearch 
        className="text-xl cursor-pointer hover:text-[#d4af37] transition-all duration-300 hover:scale-110" 
      />
      
      {/* أيقونة الحساب الشخصي */}
      <FiUser 
        className="text-xl cursor-pointer hover:text-[#d4af37] transition-all duration-300 hover:scale-110" 
      />
      
      {/* أيقونة سلة المشتريات */}
      <div className="relative cursor-pointer group">
        <FiShoppingBag 
          className="text-2xl group-hover:text-[#d4af37] transition-all duration-300 group-hover:scale-110" 
        />
        {/* دائرة العدد بالأسود والكتابة بالأبيض */}
        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
          0
        </span>
      </div>
    </div>
  );
};

export default Actions;