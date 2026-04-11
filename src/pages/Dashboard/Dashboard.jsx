import React, { useState } from 'react';
import SliderManagement from './components/sliders/SliderManagement'; 
// استيراد مكون إدارة المنتجات بالمسار الصحيح بناءً على الصورة
import ProductManagement from './components/Shop/ProductManagement'; 
import { LayoutDashboard, Images, Package, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Sidebar - القائمة الجانبية */}
      <div className="w-64 bg-[#123456] text-white p-6 flex flex-col gap-8">
        <h1 className="text-2xl font-black italic tracking-tighter">ROYAL PANEL</h1>
        
        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white text-[#123456]' : 'hover:bg-white/10'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Overview</span>
          </button>

          <button 
            onClick={() => setActiveTab('sliders')}
            className={`flex items-center gap-3 p-4 rounded-xl transition-all ${activeTab === 'sliders' ? 'bg-white text-[#123456]' : 'hover:bg-white/10'}`}
          >
            <Images size={20} />
            <span className="font-bold uppercase text-xs tracking-widest">Home Sliders</span>
          </button>

          {/* زر Inventory الجديد */}
          <button 
            onClick={() => setActiveTab('inventory')}
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

      {/* Main Content - المحتوى الرئيسي */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <div className="text-[#123456] font-black uppercase tracking-widest p-20 text-center">Dashboard Overview Coming Soon</div>}
          {activeTab === 'sliders' && <SliderManagement />}
          
          {/* عرض إدارة المنتجات التي تحتوي على الفورم والجدول */}
          {activeTab === 'inventory' && (
            <ProductManagement onBack={() => setActiveTab('overview')} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;