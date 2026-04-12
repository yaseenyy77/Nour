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
    <div className="flex min-h-screen bg-[#f8f9fa] relative font-sans">
      
      {/* --- Mobile Header (تعديل الألوان والظل ليكون أكثر رقياً) --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-[#001b44] text-white p-4 flex justify-between items-center z-[100] shadow-xl">
        <h1 className="text-xl font-black italic tracking-tighter text-[#d4af37]">ROYAL PANEL</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Sidebar (السايد بار المعدل بألوان البراند) --- */}
      <div className={`
        fixed inset-y-0 left-0 z-[110] w-72 bg-[#001b44] text-white p-8 flex flex-col gap-8 transition-transform duration-500 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto lg:z-0
        ${isMobileMenuOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.2)]' : '-translate-x-full'}
      `}>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black italic tracking-tighter text-[#d4af37]">ROYAL PANEL</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">Management System</p>
        </div>
        
        <nav className="flex flex-col gap-3 mt-12 lg:mt-4">
          <button 
            onClick={() => handleTabChange('overview')}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${activeTab === 'overview' ? 'bg-[#d4af37] text-[#001b44] shadow-lg shadow-[#d4af37]/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Overview</span>
          </button>

          <button 
            onClick={() => handleTabChange('sliders')}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${activeTab === 'sliders' ? 'bg-[#d4af37] text-[#001b44] shadow-lg shadow-[#d4af37]/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
          >
            <Images size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Home Sliders</span>
          </button>

          <button 
            onClick={() => handleTabChange('inventory')}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${activeTab === 'inventory' ? 'bg-[#d4af37] text-[#001b44] shadow-lg shadow-[#d4af37]/20' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
          >
            <Package size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Inventory</span>
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button className="flex items-center gap-4 p-4 text-red-400/80 font-bold uppercase text-xs hover:bg-red-500/10 w-full rounded-2xl transition-all">
            <LogOut size={20} />
            Logout System
          </button>
        </div>
      </div>

      {/* --- Overlay للموبايل --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- Main Content (تعديل الـ Padding ليتوافق مع الموبايل) --- */}
      <main className="flex-1 overflow-y-auto mt-[72px] lg:mt-0 p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          
          {/* محتوى التبويبات */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'overview' && (
              <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
                 <div className="w-20 h-20 bg-[#f9f9f9] rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-50">
                    <LayoutDashboard size={32} className="text-[#d4af37]" />
                 </div>
                 <h2 className="text-[#001b44] font-black uppercase italic text-2xl tracking-tight">Welcome to Royal Dashboard</h2>
                 <p className="text-gray-400 text-xs font-bold mt-2 uppercase tracking-widest">Manage your jewellery collection with elegance</p>
              </div>
            )}
            
            {activeTab === 'sliders' && <SliderManagement />}
            
            {activeTab === 'inventory' && (
              <div className="flex flex-col gap-6">
                {/* تم تمرير دالة العودة وتنسيق الحاوية لتناسب ProductManagement */}
                <ProductManagement onBack={() => setActiveTab('overview')} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;