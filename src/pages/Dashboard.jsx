import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  const [testText, setTestText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);

    // بنبعت النص لجدول products في خانة name للتجربة
    const { error } = await supabase
      .from('products')
      .insert([{ name: testText }]);

    if (error) {
      alert("حصل مشكلة: " + error.message);
    } else {
      alert("الكلام اتبعث بنجاح! روح شوف الموقع");
      setTestText('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#111] p-8 rounded-3xl border border-[#d4af37]/30 shadow-2xl">
        <h1 className="text-[#d4af37] text-2xl font-serif italic mb-6 text-center">تجربة ربط البيانات</h1>
        
        <form onSubmit={handleSend} className="space-y-6">
          <input 
            type="text" 
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="اكتب أي كلمة هنا..."
            className="w-full bg-black border border-gray-800 p-4 rounded-xl outline-none focus:border-[#d4af37] transition-all text-center text-lg"
            required
          />
          
          <button 
            disabled={loading}
            className="w-full bg-[#d4af37] text-black font-bold py-4 rounded-xl hover:bg-white transition-all disabled:opacity-50 shadow-lg shadow-[#d4af37]/10"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال للموقع الآن'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;