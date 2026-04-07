import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // نتأكد هل فيه جلسة (Session) مفتوحة؟
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // لو حالة الدخول اتغيرت (خرج أو دخل)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="h-screen bg-black flex items-center justify-center text-[#d4af37]">Loading...</div>;

  // لو مفيش جلسة، ابعته لصفحة اللوجن
  if (!session) {
    return <Navigate to="/admin-login" />;
  }

  return children;
};

export default ProtectedRoute;