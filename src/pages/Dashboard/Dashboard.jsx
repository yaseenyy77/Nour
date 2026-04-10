import React, { useState } from 'react';
import ProductManagement from './components/ProductManagement'; // استدعاء المكون الجديد
import { Package } from 'lucide-react';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('menu'); // 'menu' or 'products'

  return (
    <div className="min-h-screen bg-white text-[#123456] p-6 pt-32 font-sans" dir="ltr">
      <div className="max-w-7xl mx-auto">
        
        {activeView === 'menu' ? (
          <div className="flex flex-col items-center animate-in fade-in duration-700">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl font-black text-[#123456] tracking-tight mb-4 uppercase">
                Royal Dashboard
              </h1>
              <div className="h-1 w-24 bg-[#123456] mx-auto mb-6"></div>
              <p className="text-[#446688] text-lg italic">Select a department to manage</p>
            </div>

            {/* Large Square Button */}
            <button
              onClick={() => setActiveView('products')}
              className="group w-80 h-80 bg-[#123456] rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl hover:shadow-[#123456]/40 hover:-translate-y-2 transition-all duration-500 border-8 border-double border-white outline outline-2 outline-[#123456]"
            >
              <Package size={80} className="mb-6 group-hover:scale-110 transition-transform duration-500" />
              <span className="text-3xl font-bold tracking-widest uppercase">Shop Items</span>
              <div className="mt-4 px-4 py-1 bg-white text-[#123456] text-xs font-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                OPEN MANAGEMENT
              </div>
            </button>
          </div>
        ) : (
          /* View the Component */
          <div className="animate-in slide-in-from-right-10 duration-500">
            <ProductManagement onBack={() => setActiveView('menu')} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;