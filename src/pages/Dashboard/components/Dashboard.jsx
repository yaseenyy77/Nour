import React, { useState } from 'react';
import ShopProductsForm from './components/ShopProductsForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('shop');

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28 flex flex-col items-center">
      {/* العنوان الرئيسي */}
      <div className="text-center mb-12">
        <h1 className="text-[#d4af37] text-4xl font-serif italic mb-2 uppercase tracking-widest">Nour Admin</h1>
        <div className="h-[1px] w-32 bg-[#d4af37]/30 mx-auto"></div>
      </div>
      
      {/* أزرار التنقل (Tabs) */}
      <div className="flex bg-[#111] p-1 rounded-2xl border border-gray-800 mb-10 shadow-xl">
        <button 
          onClick={() => setActiveTab('shop')}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
            activeTab === 'shop' 
            ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' 
            : 'text-gray-500 hover:text-white'
          }`}
        >
          منتجات المتجر
        </button>
        
        <button 
          onClick={() => setActiveTab('orders')}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
            activeTab === 'orders' 
            ? 'bg-[#d4af37] text-black shadow-lg' 
            : 'text-gray-500 hover:text-white'
          }`}
        >
          إدارة الطلبات
        </button>

        <button 
          onClick={() => setActiveTab('users')}
          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
            activeTab === 'users' 
            ? 'bg-[#d4af37] text-black shadow-lg' 
            : 'text-gray-500 hover:text-white'
          }`}
        >
          المستخدمين
        </button>
      </div>

      {/* عرض المحتوى بناءً على القسم المختار */}
      <div className="w-full max-w-4xl transition-all duration-500">
        {activeTab === 'shop' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ShopProductsForm />
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-gray-800">
            <p className="text-gray-600 italic">قريباً: شاشة إدارة طلبات العملاء...</p>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="text-center py-20 bg-[#111] rounded-3xl border border-dashed border-gray-800">
            <p className="text-gray-600 italic">قريباً: شاشة التحكم في صلاحيات المستخدمين...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;