import React, { useState } from 'react';
import SliderManagement from './components/sliders/SliderManagement'; 
import ProductManagement from './components/Shop/ProductManagement'; 
import { LayoutDashboard, Images, Package, LogOut, Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // دالة لتغيير التبويب وقفل المنيو في الموبايل تلقائياً
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] relative">
      
      {/* --- Mobile Header --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#123456] text-white p-4 flex justify-between items-center z-50 shadow-lg">
        <h1 className="text-xl font-black italic tracking-tighter">ROYAL PANEL</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Sidebar (السايد بار) --- */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#123456] text-white p-6 flex flex-col gap-8 transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <h1 className="text-2xl font-black italic tracking-tighter hidden lg:block">ROYAL PANEL</h1>
        
        <nav className="flex flex-col gap-2 mt-16 lg:mt-0">
          <button 
            onClick={() => handleTabChange('overview')}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white text-[#123456]' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Overview</span>
          </button>

          <button 
            onClick={() => handleTabChange('sliders')}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'sliders' ? 'bg-white text-[#123456]' : 'hover:bg-white/10'}`}
          >
            <Images size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Home Sliders</span>
          </button>

          <button 
            onClick={() => handleTabChange('inventory')}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-white text-[#123456]' : 'hover:bg-white/10'}`}
          >
            <Package size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Inventory</span>
          </button>
        </nav>

        <div className="mt-auto">
          <button className="flex items-center gap-3 p-4 text-red-400 font-bold uppercase text-xs hover:bg-red-500/10 w-full rounded-xl transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* --- Overlay (خلفية سوداء خفيفة تظهر عند فتح المنيو في الموبايل) --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- Main Content (المحتوى الرئيسي) --- */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto mt-16 lg:mt-0">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
               <h2 className="text-[#123456] font-black uppercase italic text-xl">Welcome to Royal Dashboard</h2>
            </div>
          )}
          
          {activeTab === 'sliders' && <SliderManagement />}
          
          {activeTab === 'inventory' && (
            <ProductManagement onBack={() => setActiveTab('overview')} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;