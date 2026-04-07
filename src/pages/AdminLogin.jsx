import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("بيانات غلط! حاول تاني");
    } else {
      alert("تم تسجيل الدخول بنجاح يا مدير");
      navigate('/admin'); // هيدخلك على لوحة التحكم
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-2xl border border-[#d4af37] w-full max-w-md">
        <h2 className="text-3xl font-serif text-[#d4af37] mb-8 text-center italic">Nour Gold Admin</h2>
        <input 
          type="email" 
          placeholder="الإيميل بتاعك" 
          className="w-full bg-transparent border-b border-gray-700 py-3 mb-6 outline-none focus:border-[#d4af37]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="الباسورد" 
          className="w-full bg-transparent border-b border-gray-700 py-3 mb-10 outline-none focus:border-[#d4af37]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-full hover:bg-white transition-all">
          دخول
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;