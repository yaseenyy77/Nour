import React from 'react';

const Copyright = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase">
        © 2026 NOUR GOLD. ALL RIGHTS RESERVED.
      </p>
      <div className="flex gap-6">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer" />
      </div>
    </div>
  );
};

export default Copyright;