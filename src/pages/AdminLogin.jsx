import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("بيانات غلط! تأكد من الإيميل والباسورد");
      setLoading(false);
    } else {
      alert("تم تسجيل الدخول بنجاح");
      navigate('/dashboard'); 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-[#111] p-10 rounded-2xl border border-[#d4af37] w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-serif text-[#d4af37] mb-8 text-center italic">Nour Gold Admin</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="الإيميل" 
            className="w-full bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="الباسورد" 
            className="w-full bg-black border border-gray-800 p-3 rounded-xl outline-none focus:border-[#d4af37]"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          disabled={loading}
          className="w-full mt-8 bg-[#d4af37] text-black font-bold py-3 rounded-xl hover:bg-white transition-all disabled:opacity-50"
        >
          {loading ? 'جاري الدخول...' : 'دخول'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;