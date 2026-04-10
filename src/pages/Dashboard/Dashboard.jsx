import React, { useState } from 'react';
import ProductManagement from './components/Shop/ProductManagement'; 
import SliderManagement from './components/sliders/SliderManagement';
import { Package, Images, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('menu');

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#123456] p-6 pt-32 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {activeView === 'menu' ? (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
            <div className="text-center mb-20">
              <div className="flex justify-center mb-4 text-[#d4af37]"><LayoutDashboard size={40}/></div>
              <h1 className="text-5xl font-black text-[#123456] tracking-tighter mb-4 uppercase italic">
                Nour Gold <span className="text-[#d4af37]">Portal</span>
              </h1>
              <p className="text-gray-400 text-xs font-black tracking-[0.5em] uppercase">Control Panel & Inventory</p>
            </div>

            <div className="flex flex-col md:flex-row gap-12 justify-center w-full max-w-4xl">
              <button
                onClick={() => setActiveView('products')}
                className="group flex-1 aspect-square bg-[#123456] rounded-[3rem] flex flex-col items-center justify-center text-white shadow-2xl hover:bg-[#1a4a7a] transition-all duration-500 border-[12px] border-white outline outline-2 outline-[#123456]"
              >
                <Package size={60} className="mb-4 group-hover:scale-110 transition-transform" />
                <span className="text-xl font-black tracking-widest uppercase">Inventory</span>
                <span className="text-[10px] mt-2 opacity-50 font-bold tracking-[0.2em]">SHOP</span>
              </button>

              <button
                onClick={() => setActiveView('sliders')}
                className="group flex-1 aspect-square bg-white rounded-[3rem] flex flex-col items-center justify-center text-[#123456] shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-50"
              >
                <Images size={60} className="mb-4 group-hover:scale-110 transition-transform text-[#d4af37]" />
                <span className="text-xl font-black tracking-widest uppercase">Sliders</span>
                <span className="text-[10px] mt-2 text-gray-400 font-bold tracking-[0.2em]">HOME</span>
              </button>
            </div>
          </div>
        ) : activeView === 'products' ? (
          <ProductManagement onBack={() => setActiveView('menu')} />
        ) : (
          <SliderManagement onBack={() => setActiveView('menu')} />
        )}

      </div>
    </div>
  );
};

export default Dashboard;